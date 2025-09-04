import {
  Component,
  Input,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() text = '';
  visible = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  setPosition(hostPos: DOMRect): void {
    const tooltipEl =
      this.elementRef.nativeElement.querySelector('.tooltip-container');

    if (!tooltipEl) {
      console.error('Tooltip element not found!');
      return;
    }

    const tooltipRect = tooltipEl.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let top = hostPos.top + scrollTop - tooltipRect.height - 8;

    let left =
      hostPos.left + scrollLeft + hostPos.width / 2 - tooltipRect.width / 2;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < scrollLeft + 10) {
      left = scrollLeft + 10;
    }

    if (left + tooltipRect.width > scrollLeft + viewportWidth - 10) {
      left = scrollLeft + viewportWidth - tooltipRect.width - 10;
    }

    if (top < scrollTop + 10) {
      top = hostPos.top + scrollTop + hostPos.height + 8;

      this.renderer.setStyle(tooltipEl, 'transform-origin', 'center top');
    }

    this.renderer.setStyle(tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(tooltipEl, 'left', `${left}px`);

    setTimeout(() => {
      this.visible = true;
    }, 10);
  }
}
