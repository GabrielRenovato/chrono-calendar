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

@Component({
  selector: 'app-weekly-view',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './weekly-view.component.html',
  styleUrl: './weekly-view.component.scss',
})
export class WeeklyViewComponent implements OnChanges {
  @Input() days: CalendarDay[] = [];
  @Output() dayClicked = new EventEmitter<DateTime>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();

  eventLayouts = new Map<string | number, object>();
  private maxZIndex = 10;
  weekdays: string[] = Info.weekdays('short', {
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
  }).map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3));
  hoursOfDay: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_PER_HOUR = 80;
  private PIXELS_PER_MINUTE = this.PIXELS_PER_HOUR / 60;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['days'] && this.days.length > 0) {
      this.calculateLayoutsForWeek();
    }
  }

  private calculateLayoutsForWeek(): void {
    this.eventLayouts.clear();

    for (const day of this.days) {
      if (day.events.length === 0) {
        continue;
      }

      const sortedEvents = [...day.events].sort(
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
          const minutesSinceMidnight =
            event.start.hour * 60 + event.start.minute;
          const durationInMinutes = event.end.diff(
            event.start,
            'minutes'
          ).minutes;

          const CASCADE_OFFSET_PERCENT = 12;

          const width = 100 - (totalColumns - 1) * CASCADE_OFFSET_PERCENT;
          const left = i * CASCADE_OFFSET_PERCENT;
          const zIndex = i + 10;

          const styles: any = {
            top: `${minutesSinceMidnight * this.PIXELS_PER_MINUTE}px`,
            height: `${Math.max(
              20,
              durationInMinutes * this.PIXELS_PER_MINUTE
            )}px`,
            left: `${left}%`,
            width: `${width}%`,
            zIndex: zIndex,
          };

          if (i > 0) {
            styles['border'] = '1px solid white';
          }

          this.eventLayouts.set(event.id, styles);
        }
      }
    }
  }

  bringEventToFront(event: CalendarEvent): void {
    const currentStyle = this.eventLayouts.get(event.id) as any;
    if (!currentStyle) return;

    this.maxZIndex++;
    const newStyle = { ...currentStyle, zIndex: this.maxZIndex };

    this.eventLayouts.set(event.id, newStyle);

    this.eventClicked.emit(event);
  }
}
