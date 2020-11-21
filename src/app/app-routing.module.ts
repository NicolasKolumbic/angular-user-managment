import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersManagmentComponent } from './pages/users-managment/users-managment.component';


const routes: Routes = [
  {
    path: '',
    component: UsersManagmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
