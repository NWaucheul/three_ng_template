import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThreeResizeComponent } from 'src/app/components/three-resize/three-resize';
import { SWSizeObserverModule } from '@service-work/size-observer';



@NgModule({
  declarations: [
    ThreeResizeComponent
  ],
  imports: [
    CommonModule,
    SWSizeObserverModule
  ],
  exports: [
    ThreeResizeComponent
  ]
})
export class ThreeResizeModule {
}
