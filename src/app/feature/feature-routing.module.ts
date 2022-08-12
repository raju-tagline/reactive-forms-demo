import { FeatureComponent } from './feature/feature.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
  },
  {
    path: 'first',
    loadComponent: () =>
      import('./first/first.component').then((m) => m.FirstComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
