import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[appResaltarProxima]', standalone: false })
export class ResaltarProximaDirective implements OnInit {
  @Input() appResaltarProxima: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const hoy = new Date();
    const fechaCita = new Date(this.appResaltarProxima + 'T00:00:00');
    const diffHoras = (fechaCita.getTime() - hoy.getTime()) / 3600000;

    if (diffHoras >= 0 && diffHoras <= 24) {
      this.renderer.addClass(this.el.nativeElement, 'border-warning');
      this.renderer.addClass(this.el.nativeElement, 'border-2');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ffc107');
    }
  }
}
