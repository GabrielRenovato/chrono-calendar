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

@Component({
  selector: 'app-daily-view',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './daily-view.component.html',
  styleUrl: './daily-view.component.scss',
})
export class DailyViewComponent implements OnChanges {
  @Input() day: CalendarDay | undefined;
  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  eventLayouts = new Map<string | number, object>();

  hoursOfDay: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_PER_HOUR = 80;
  private PIXELS_PER_MINUTE = this.PIXELS_PER_HOUR / 60;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['day'] && this.day) {
      this.calculateEventLayouts(this.day.events);
    }
  }

  private calculateEventLayouts(events: CalendarEvent[]): void {
    this.eventLayouts.clear();
    if (events.length === 0) {
      return;
    }

    const sortedEvents = [...events].sort(
      (a, b) => a.start.toMillis() - b.start.toMillis()
    );

    const columns: CalendarEvent[][] = [];
    for (const event of sortedEvents) {
      let columnFound = false;
      for (const column of columns) {
        const lastEventInColumn = column[column.length - 1];
        if (lastEventInColumn.end <= event.start) {
          column.push(event);
          columnFound = true;
          break;
        }
      }
      if (!columnFound) {
        columns.push([event]);
      }
    }

    const totalColumns = columns.length;
    for (let i = 0; i < totalColumns; i++) {
      for (const event of columns[i]) {
        const minutesSinceMidnight = event.start.hour * 60 + event.start.minute;
        const durationInMinutes = event.end.diff(
          event.start,
          'minutes'
        ).minutes;

        const width = 100 / totalColumns;
        const left = i * width;

        const styles: any = {
          top: `${minutesSinceMidnight * this.PIXELS_PER_MINUTE}px`,
          height: `${Math.max(
            20,
            durationInMinutes * this.PIXELS_PER_MINUTE
          )}px`,
          left: `${left}%`,
          width: `${width}%`,
          zIndex: i + 10,
        };

        if (i > 0) {
          styles['borderLeft'] = '2px solid white';
        }

        this.eventLayouts.set(event.id, styles);
      }
    }
  }
}
