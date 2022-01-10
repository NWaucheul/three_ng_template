import { install as installResizeObserver } from 'resize-observer';
import 'zone.js'; // Included with Angular CLI.


if (!(<any>window).ResizeObserver) {
  installResizeObserver();
}
