import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppHome} from './home/home.component';

const routes: Routes = [
  {path:'', component: AppHome}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
