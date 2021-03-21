import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeComponent } from './time/time.component';

const routes: Routes = [
  {
    path: '',
    component: TimeComponent,
    data: { title: 'Server Time Details' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
