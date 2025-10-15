import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { DateTime } from 'luxon';
import { CalendarDay, CalendarEvent } from '../../calendar.model';
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
  selector: 'app-daily-view',
  standalone: true,
  imports: [CommonModule, NgStyle, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './daily-view.component.html',
  styleUrl: './daily-view.component.scss',
})
export class DailyViewComponent implements OnChanges {
  @Input() day: CalendarDay | undefined;
  @Input() enableDragDrop: boolean = true; 
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventDropped = new EventEmitter<EventDroppedInfo>();

  hoursOfDay: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_PER_HOUR = 80;
  private PIXELS_PER_MINUTE = this.PIXELS_PER_HOUR / 60;

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getEventsAtHour(hour: number): CalendarEvent[] {
    if (!this.day) return [];
    return this.day.events.filter(event => event.start.hour === hour);
  }

  getEventStyle(event: CalendarEvent, hour: number, eventIndex: number): any {
    const eventsAtHour = this.getEventsAtHour(hour);
    const totalEvents = eventsAtHour.length;
    
    const durationMinutes = event.end.diff(event.start, 'minutes').minutes;
    const height = Math.max(20, durationMinutes * this.PIXELS_PER_MINUTE);
    
    let width = 100;
    let left = 0;
    
    if (totalEvents > 1) {
      width = 100 / totalEvents;
      left = eventIndex * width;
    }
    
    const styles: any = {
      position: 'absolute',
      top: '2px',
      height: `${height}px`,
      left: `${left}%`,
      width: `${width}%`,
      zIndex: 10 + eventIndex,
    };
    
    if (eventIndex > 0) {
      styles['borderLeft'] = '2px solid white';
    }
    
    return styles;
  }

  onSlotDrop(dropEvent: CdkDragDrop<CalendarEvent[]>, targetHour: number): void {
    if (!this.enableDragDrop || !this.day) return; 

    const droppedEvent = dropEvent.item.data as CalendarEvent;
    const previousDate = droppedEvent.start;

    const index = this.day.events.findIndex(e => e.id === droppedEvent.id);
    if (index !== -1) {
      this.day.events.splice(index, 1);
    }

    const duration = droppedEvent.end.diff(droppedEvent.start);
    const newStart = this.day.date.set({
      hour: targetHour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    const newEnd = newStart.plus(duration);

    droppedEvent.start = newStart;
    droppedEvent.end = newEnd;

    this.day.events.push(droppedEvent);

    this.eventDropped.emit({
      event: droppedEvent,
      newDate: newStart,
      previousDate: previousDate
    });
  }

  getSlotId(hour: number): string {
    return `day-slot-${hour}`;
  }
}
