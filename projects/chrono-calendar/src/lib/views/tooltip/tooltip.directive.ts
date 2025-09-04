import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  ComponentRef,
  ViewContainerRef,
  Renderer2,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') text = '';
  private tooltipComponentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const hostElement = this.elementRef.nativeElement;

    if (
      hostElement.scrollWidth > hostElement.clientWidth &&
      !this.tooltipComponentRef
    ) {
      this.tooltipComponentRef =
        this.viewContainerRef.createComponent(TooltipComponent);

      this.renderer.appendChild(
        document.body,
        this.tooltipComponentRef.location.nativeElement
      );

      this.tooltipComponentRef.instance.text =
        this.text || hostElement.textContent || '';

      this.tooltipComponentRef.changeDetectorRef.detectChanges();

      requestAnimationFrame(() => {
        if (this.tooltipComponentRef) {
          const hostPos = hostElement.getBoundingClientRect();
          this.tooltipComponentRef.instance.setPosition(hostPos);
        }
      });
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }
}
