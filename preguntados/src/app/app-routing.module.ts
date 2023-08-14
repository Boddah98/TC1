import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppHome} from './home/home.component';
import {AppGame} from './game/game.component';
import { PopUpName } from './popUpName/popUpName.component';

const routes: Routes = [
  {path:'', component: AppHome},
  {path:'game', component: AppGame},
  {path:'popUpName', component: PopUpName}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
