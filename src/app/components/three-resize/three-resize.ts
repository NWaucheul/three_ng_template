import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SizeObserver, SizeObserverService } from '@service-work/size-observer';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { MainScene } from 'src/app/utils/mainScene';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'three-resize',
  template: ''
})
export class ThreeResizeComponent implements AfterViewInit, OnDestroy {
  @Output() isResizing: EventEmitter<boolean> = new EventEmitter();

  @Input() mainScene: MainScene;

  subEventResize: Subscription;

  private sizeObserver: SizeObserver;

  constructor(
    private el: ElementRef,
    private sizeObserverService: SizeObserverService
  ) {}

  ngAfterViewInit() {
    this.sizeObserver = this.sizeObserverService.observe(this.el);

    this.subEventResize = this.sizeObserver.sizeChanges$.pipe(
      tap(() => this.isResizing.emit(true)),
      debounceTime(200)
    )
    .subscribe(() => {
      const canvasSizes = {
        width: this.el.nativeElement.offsetWidth,
        height: this.el.nativeElement.offsetHeight
      };

      this.mainScene.updateCamera(canvasSizes);

      this.isResizing.emit(false);
    });
  }

  ngOnDestroy() {
    if (this.subEventResize) this.subEventResize.unsubscribe();
  }
}
