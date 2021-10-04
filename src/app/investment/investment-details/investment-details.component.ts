import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Investment } from 'src/app/models/investment';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrls: ['./investment-details.component.scss']
})
export class InvestmentDetailsComponent implements OnInit {

  private _unsubscribe$ = new Subject();
  investmentDetails: Investment = new Investment();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public investmentService: InvestmentService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.investmentService.getInvestmentById(id)
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(result => this.investmentDetails = result);
  }

  ngOnDestroy(): void{
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  goBack(): void {
    this.router.navigate(['investments/']);
  }

}
