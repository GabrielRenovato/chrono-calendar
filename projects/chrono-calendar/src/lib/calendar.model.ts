import { DateTime } from 'luxon'; // 1. Import DateTime

export type ViewType = 'monthly' | 'weekly' | 'daily';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: DateTime;
  end: DateTime;
  color?: string;
  layout?: {
    width: number;
    left: number;
    column: number;
    totalColumns: number;
  };
}

export interface CalendarDay {
  date: DateTime;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
}
