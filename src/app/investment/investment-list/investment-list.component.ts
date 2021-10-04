import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, switchMap, map, debounceTime, takeUntil } from 'rxjs/operators';
import { Investment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';

interface State {
  page: number;
  pageSize: number;
  townFilterTerm: string;
  progressFilterTerm: string;
}

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss']
})
export class InvestmentListComponent implements OnInit {

  private _unsubscribe$ = new Subject();
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _investments$ = new BehaviorSubject<Investment[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  townList: string[] = [];
  progressReportsList: string[] = [];

  get investments$() { return this._investments$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }
  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get townFilterTerm() { return this._state.townFilterTerm; }
  set townFilterTerm(townFilterTerm: string) { this._set({townFilterTerm}); }
  get progressFilterTerm() { return this._state.progressFilterTerm; }
  set progressFilterTerm(progressFilterTerm: string) { this._set({progressFilterTerm}); }

  private _state: State = {
    page: 1,
    pageSize: 10,
    townFilterTerm: "",
    progressFilterTerm: ""
  };

  filterTowns = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term: string) => {
        if (term === '') {
          this.townFilterTerm = term;
          this._search$.next();
          return [];
        }
        return this.townList.filter((t: string) => t.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      }),
      takeUntil(this._unsubscribe$)
    )

  constructor(private router: Router, public investmentService: InvestmentService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      switchMap(() => this.investmentService.searchInvestments(this._state)),
      tap(() => this._loading$.next(false)),
      takeUntil(this._unsubscribe$)
    ).subscribe((result: any) => {
      this._investments$.next(result.items);
      this._total$.next(result.pageable.total);
    });
  }

  ngOnInit(): void {
    this._search$.next();
    this.investmentService.getTowns()
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(towns => {
      this.townList = towns
    });
    this.investmentService.getProgressReports()
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(progressReports => {
      this.progressReportsList = progressReports;
    });
  }

  ngOnDestroy(): void{
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private _set(patch: Partial<State>): void {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  handleTownFilterSelect(value: string): void {
    this.townFilterTerm = value;
  }

  showDetails(id: string): void {
    this.router.navigate([`/investments/${id}`]);
  }
 
}
