import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDay, CalendarEvent, EventDroppedInfo } from '../../calendar.model';
import { DateTime, Info } from 'luxon';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { 
  CdkDragDrop, 
  CdkDrag, 
  CdkDropList, 
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem 
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-monthly-view',
  standalone: true,
  imports: [
    CommonModule, 
    TooltipDirective, 
    CdkDropList, 
    CdkDrag, 
    CdkDropListGroup
  ],
  templateUrl: './monthly-view.component.html',
  styleUrl: './monthly-view.component.scss',
})
export class MonthlyViewComponent {
  @Input() days: CalendarDay[] = [];
  @Input() enableDragDrop: boolean = true; 
  @Output() dayClicked = new EventEmitter<DateTime>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventDropped = new EventEmitter<EventDroppedInfo>();

  weekdays: string[] = Info.weekdays('short', {
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  });

  onEventDrop(event: CdkDragDrop<CalendarEvent[]>, targetDay: CalendarDay): void {
    if (!this.enableDragDrop) return; 

    const droppedEvent = event.item.data as CalendarEvent;
    const previousDate = droppedEvent.start;
    
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const timeDiff = droppedEvent.end.diff(droppedEvent.start);
      const newStart = targetDay.date.set({
        hour: droppedEvent.start.hour,
        minute: droppedEvent.start.minute,
        second: droppedEvent.start.second
      });
      const newEnd = newStart.plus(timeDiff);

      droppedEvent.start = newStart;
      droppedEvent.end = newEnd;

      this.eventDropped.emit({
        event: droppedEvent,
        newDate: newStart,
        previousDate: previousDate
      });
    }
  }

  getDayId(day: CalendarDay): string {
    return `day-${day.date.toISODate()}`;
  }
}
