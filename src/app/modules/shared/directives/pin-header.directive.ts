import { WindowRef } from './../window-ref';
import { Directive, HostListener, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPinHeader]'
})
export class PinHeaderDirective implements OnInit {

  lastScrollY = 0;
  isShowing = true;
  // tslint:disable-next-line:no-input-rename
  @Input('appPinHeader') pinHeaderStyleClass: string;

  ngOnInit(): void {
    if (this.pinHeaderStyleClass) {
      this.el.nativeElement.classList.add(this.pinHeaderStyleClass);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'top 0.3s ease-in-out');
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', '0');
      this.renderer.setStyle(this.el.nativeElement, 'right', '0');
      this.renderer.setStyle(this.el.nativeElement, 'left', '0');
      this.renderer.setStyle(this.el.nativeElement, 'z-index', '1030');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private windRef: WindowRef) {

  }

  @HostListener('window:scroll', ['$event']) onScroll() {

    const offsetY: number = this.windRef.nativeWindow.pageYOffset;

    if (offsetY > this.lastScrollY) {
      if (this.isShowing === false) {
        this.lastScrollY = offsetY;
        return;
      }
    } else if (this.isShowing === true) {
      this.lastScrollY = offsetY;
      return;
    }

    if (offsetY > this.lastScrollY) {
      if (this.pinHeaderStyleClass) {
        this.el.nativeElement.classList.remove(this.pinHeaderStyleClass);

      } else {
        this.renderer.setStyle(this.el.nativeElement, 'top', '-56px');
      }

      this.isShowing = false;
    } else {
      if (this.pinHeaderStyleClass) {
        this.el.nativeElement.classList.add(this.pinHeaderStyleClass);
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'top', '0');
      }

      this.isShowing = true;
    }
    this.lastScrollY = offsetY;
  }
}
