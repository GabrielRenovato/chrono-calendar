import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDay, CalendarEvent } from '../../calendar.model';
import { DateTime, Info } from 'luxon';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-monthly-view',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './monthly-view.component.html',
  styleUrl: './monthly-view.component.scss',
})
export class MonthlyViewComponent {
  @Input() days: CalendarDay[] = [];
  @Output() dayClicked = new EventEmitter<DateTime>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  weekdays: string[] = Info.weekdays('short', {
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  });
}
