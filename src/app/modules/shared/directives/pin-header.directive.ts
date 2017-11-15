import { WindowRef } from './../window-ref';
import { Directive, HostListener, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPinHeader]'
})
export class PinHeaderDirective implements OnInit {

  lastScrollY = 0;
  delta = 100;
  // tslint:disable-next-line:no-input-rename
  @Input('appPinHeader') pinHeaderStyleClass: string;

  ngOnInit(): void {
    if (this.pinHeaderStyleClass) {
      this.el.nativeElement.classList.add(this.pinHeaderStyleClass);
    } else {
      this.renderer.setElementStyle(this.el.nativeElement, 'transition', 'top 0.3s ease-in-out');
      this.renderer.setElementStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setElementStyle(this.el.nativeElement, 'top', '0');
      this.renderer.setElementStyle(this.el.nativeElement, 'right', '0');
      this.renderer.setElementStyle(this.el.nativeElement, 'left', '0');
      this.renderer.setElementStyle(this.el.nativeElement, 'z-index', '1030');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer, private windRef: WindowRef) {

  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    const offsetY: number = this.windRef.nativeWindow.pageYOffset;
    if (Math.abs(this.lastScrollY - offsetY) <= this.delta) {
      return;
    }

    if (offsetY > this.lastScrollY) {
      if (this.pinHeaderStyleClass) {
        this.el.nativeElement.classList.remove(this.pinHeaderStyleClass);

      } else {
        this.renderer.setElementStyle(this.el.nativeElement, 'top', '-56px');
      }
    } else {
      if (this.pinHeaderStyleClass) {
        this.el.nativeElement.classList.add(this.pinHeaderStyleClass);
      } else {
        this.renderer.setElementStyle(this.el.nativeElement, 'top', '0');
      }
    }
    this.lastScrollY = offsetY;
  }
}
