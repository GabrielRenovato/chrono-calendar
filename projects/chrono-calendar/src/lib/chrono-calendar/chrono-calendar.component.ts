import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarDay, CalendarEvent, ViewType } from '../calendar.model';

import { DateTime } from 'luxon';
import { WeeklyViewComponent } from '../views/semanal-view/weekly-view.component';
import { MonthlyViewComponent } from '../views/mensal-view/monthly-view.component';
import { DailyViewComponent } from '../views/diario-view/daily-view.component';

@Component({
  selector: 'chrono-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MonthlyViewComponent,
    WeeklyViewComponent,
    DailyViewComponent,
  ],
  templateUrl: './chrono-calendar.component.html',
  styleUrl: './chrono-calendar.component.scss',
})
export class ChronoCalendarComponent implements OnInit {
  @Input()
  set events(eventList: CalendarEvent[]) {
    this.eventsSignal.set(this.mapEventsByDay(eventList));
  }
  currentDate = signal(DateTime.now());
  @Input() initialView: ViewType = 'monthly';
  @Input() todayButtonText: string = 'Today';
  @Input() monthViewText: string = 'Month';
  @Input() weekViewText: string = 'Week';
  @Input() dayViewText: string = 'Day';

  @Output() dayClicked = new EventEmitter<DateTime>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() viewChange = new EventEmitter<ViewType>();
  @Output() monthChange = new EventEmitter<{
    start: DateTime;
    end: DateTime;
  }>();

  currentView = signal<ViewType>(this.initialView);
  eventsSignal = signal<{ [key: string]: CalendarEvent[] }>({});

  headerTitle = computed(() => {
    const date = this.currentDate();
    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    switch (this.currentView()) {
      case 'monthly':
        return date.toFormat('LLLL yyyy', { locale: userLocale });
      case 'weekly':
        const weekStart = date.startOf('week');
        const weekEnd = date.endOf('week');

        return `${weekStart.toFormat('LLL dd', {
          locale: userLocale,
        })} - ${weekEnd.toFormat('LLL dd, yyyy', {
          locale: userLocale,
        })}`;
      case 'daily':
        return date.toFormat('cccc, LLLL dd, yyyy', {
          locale: userLocale,
        });
      default:
        return '';
    }
  });

  daysToDisplay = computed((): CalendarDay[] => {
    switch (this.currentView()) {
      case 'monthly':
        return this.generateMonthDays();

      case 'weekly':
        return this.generateWeekDays();

      case 'daily':
        const date = this.currentDate().startOf('day');

        const today = DateTime.now();

        const dateKey = this.formatDateKey(date);

        return [
          {
            date: date,
            isCurrentMonth: true,

            isToday: this.isSameDay(date, today),

            events: this.eventsSignal()[dateKey] || [],
          },
        ];

      default:
        return [];
    }
  });

  ngOnInit() {
    this.currentView.set(this.initialView);
  }

  setView(type: ViewType): void {
    this.currentView.set(type);
    this.viewChange.emit(type);
  }

  goToPrevious(): void {
    this.currentDate.update((date) => this.advanceRetreatDate(date, -1));
  }

  goToNext(): void {
    this.currentDate.update((date) => this.advanceRetreatDate(date, 1));
  }

  goToToday(): void {
    this.currentDate.set(DateTime.now());
  }

  private advanceRetreatDate(date: DateTime, direction: 1 | -1): DateTime {
    switch (this.currentView()) {
      case 'monthly':
        return date.plus({ months: direction });
      case 'weekly':
        return date.plus({ weeks: direction });
      case 'daily':
        return date.plus({ days: direction });
    }
    return date;
  }

  private mapEventsByDay(events: CalendarEvent[]): {
    [key: string]: CalendarEvent[];
  } {
    const map: { [key: string]: CalendarEvent[] } = {};
    for (const event of events) {
      const key = this.formatDateKey(event.start);
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(event);
    }
    return map;
  }

  private formatDateKey(date: DateTime): string {
    return date.toISODate() as string;
  }

  private isSameDay(date1: DateTime, date2: DateTime): boolean {
    return date1.hasSame(date2, 'day');
  }

  private generateMonthDays(): CalendarDay[] {
    const referenceDate = this.currentDate();
    const events = this.eventsSignal();
    const today = DateTime.now();

    const firstDayOfMonth = referenceDate.startOf('month');
    let currentDay = firstDayOfMonth.startOf('week');

    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const dateKey = this.formatDateKey(currentDay);
      days.push({
        date: currentDay,
        isCurrentMonth: currentDay.month === referenceDate.month,
        isToday: this.isSameDay(currentDay, today),
        events: events[dateKey] || [],
      });
      currentDay = currentDay.plus({ days: 1 });
    }
    return days;
  }

  private generateWeekDays(): CalendarDay[] {
    const baseDate = this.currentDate();
    const events = this.eventsSignal();
    const weekStart = baseDate.startOf('week');
    const today = DateTime.now();

    const days: CalendarDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = weekStart.plus({ days: i });
      const dateKey = this.formatDateKey(date);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        events: events[dateKey] || [],
      });
    }
    return days;
  }
}
