import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentDetailsComponent } from './investment/investment-details/investment-details.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'investments',
    pathMatch: 'full',
  },
  {
    path: 'investments',
    component: InvestmentListComponent
  },
  {
    path: 'investments/:id',
    component: InvestmentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
