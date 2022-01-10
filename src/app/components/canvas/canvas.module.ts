import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasComponent } from 'src/app/components/canvas/canvas';
import { ThreeResizeModule } from './../three-resize/three-resize.module';



@NgModule({
  declarations: [
    CanvasComponent
  ],
  imports: [
    CommonModule,
    ThreeResizeModule
  ],
  exports: [
    CanvasComponent
  ]
})
export class CanvasModule {
}
