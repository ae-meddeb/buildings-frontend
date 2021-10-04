import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Investment } from '../models/investment';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { environment } from '../../environments/environment';

interface SearchBody {
  pageable: {page: number, size: number},
  criteria: {field: string, value: string}[]
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  _jsonConvert: JsonConvert = new JsonConvert();
  _apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getInvestmentById(id: string | null): Observable<any> {
    return this.http.get(`${this._apiUrl}/investments/${id}`);
  }

  searchInvestments(params: any): Observable<any> {
    const body: SearchBody = {
      pageable: {
        page: params.page,
        size: params.pageSize
      },
      criteria: []
    };

    if (params.townFilterTerm) {
      body.criteria.push({field: "city", value: params.townFilterTerm});
    }

    if (params.progressFilterTerm) {
      body.criteria.push({field: "progressState", value: params.progressFilterTerm});
    }

    return this.http.post(`${this._apiUrl}/investments/search`, body)
    .pipe(
      map((result: any) => ({
        ...result, items: this._jsonConvert.deserializeArray(result.items, Investment)
      }))
    );
  }

  getTowns(): Observable<any> {
    return this.http.get(`${this._apiUrl}/investments/metadatas/towns`);
  }

  getProgressReports(): Observable<any> {
    return this.http.get(`${this._apiUrl}/investments/metadatas/progress-reports`);
  }
}
