import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { CalendarDay, CalendarEvent } from '../../calendar.model';
import { DateTime, Info } from 'luxon';
import { 
  CdkDrag, 
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop
} from '@angular/cdk/drag-drop';

export interface EventDroppedInfo {
  event: CalendarEvent;
  newDate: DateTime;
  previousDate: DateTime;
}

@Component({
  selector: 'app-weekly-view',
  standalone: true,
  imports: [CommonModule, NgStyle, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './weekly-view.component.html',
  styleUrl: './weekly-view.component.scss',
})
export class WeeklyViewComponent implements OnChanges {
  @Input() days: CalendarDay[] = [];
  @Input() enableDragDrop: boolean = true; 
  @Output() dayClicked = new EventEmitter<DateTime>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventDropped = new EventEmitter<EventDroppedInfo>();

  private maxZIndex = 10;
  
  weekdays: string[] = Info.weekdays('short', {
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }).map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3));
  
  hoursOfDay: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private readonly PIXELS_PER_HOUR = 80;
  private readonly PIXELS_PER_MINUTE = this.PIXELS_PER_HOUR / 60;
  private readonly CASCADE_OFFSET_PERCENT = 12;

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getEventsAtHour(day: CalendarDay, hour: number): CalendarEvent[] {
    return day.events.filter(event => event.start.hour === hour);
  }

  getEventHeight(event: CalendarEvent): number {
    const durationMinutes = event.end.diff(event.start, 'minutes').minutes;
    return Math.max(20, durationMinutes * this.PIXELS_PER_MINUTE);
  }

  getEventWidth(day: CalendarDay, hour: number, eventIndex: number): string {
    const eventsAtHour = this.getEventsAtHour(day, hour);
    const totalEvents = eventsAtHour.length;
    
    if (totalEvents === 1) return '100%';
    
    const width = 100 - (totalEvents - 1) * this.CASCADE_OFFSET_PERCENT;
    return `${width}%`;
  }

  getEventLeft(day: CalendarDay, hour: number, eventIndex: number): string {
    const left = eventIndex * this.CASCADE_OFFSET_PERCENT;
    return `${left}%`;
  }

  bringEventToFront(event: CalendarEvent): void {
    this.maxZIndex++;
    this.eventClicked.emit(event);
  }

  onSlotDrop(dropEvent: CdkDragDrop<CalendarEvent[]>, targetDay: CalendarDay, targetHour: number): void {
    if (!this.enableDragDrop) return; 

    const droppedEvent = dropEvent.item.data as CalendarEvent;
    const previousDate = droppedEvent.start;

    for (const day of this.days) {
      const index = day.events.findIndex(e => e.id === droppedEvent.id);
      if (index !== -1) {
        day.events.splice(index, 1);
        break;
      }
    }

    const duration = droppedEvent.end.diff(droppedEvent.start);
    const newStart = targetDay.date.set({
      hour: targetHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    const newEnd = newStart.plus(duration);

    droppedEvent.start = newStart;
    droppedEvent.end = newEnd;

    targetDay.events.push(droppedEvent);

    this.eventDropped.emit({
      event: droppedEvent,
      newDate: newStart,
      previousDate: previousDate
    });
  }

  getSlotId(day: CalendarDay, hour: number): string {
    return `slot-${day.date.toISODate()}-${hour}`;
  }
}
