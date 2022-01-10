import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/canvas/canvas.module').then(m => m.CanvasModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/canvas/canvas.module').then(m => m.CanvasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
