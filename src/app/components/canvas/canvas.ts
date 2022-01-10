import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainScene } from 'src/app/utils/mainScene';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.html',
  styleUrls: ['./canvas.scss']
})
export class CanvasComponent implements AfterViewInit {
  mainScene: MainScene;
  isResizing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.mainScene = new MainScene();
    const canvasSizes = {
      width: this.el.nativeElement.offsetWidth,
      height: this.el.nativeElement.offsetHeight
    };

    this.mainScene.initCamera(canvasSizes);
    this.mainScene.initControls(this.canvas.nativeElement);
    this.mainScene.initRenderer(canvasSizes, this.canvas.nativeElement);

    this.mainScene.tick();

    this.mainScene.CreateTitle();
  }
}