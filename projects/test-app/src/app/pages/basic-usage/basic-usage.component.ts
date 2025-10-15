import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { ChronoCalendarComponent } from 'projects/chrono-calendar/src/lib/chrono-calendar/chrono-calendar.component';
import { CalendarEvent } from 'chrono-calendar';


@Component({
  selector: 'app-basic-usage',
  standalone: true,
  imports: [CommonModule, ChronoCalendarComponent],
  templateUrl: './basic-usage.component.html',
  styleUrl: './basic-usage.component.scss',
})
export class BasicUsageComponent implements OnInit {
  myEvents: CalendarEvent[] = [];

  ngOnInit(): void {
    this.myEvents = this.generateRandomEvents(20);
  }

  private generateRandomEvents(quantity: number): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const today = DateTime.now();
    const daysInMonth = today.daysInMonth;

    const titles = [
      'Alignment Meeting',
      'Daily Scrum',
      'Candidate Interview',
      'Lunch with Client',
      'Sprint Planning',
      'Brainstorm Session',
      'Results Presentation testing tooltip',
      'Medical Appointment',
      'Design Workshop',
    ];
    const colors = [
      '#007bff',
      '#28a745',
      '#dc3545',
      '#ffc107',
      '#17a2b8',
      '#6f42c1',
      '#6610f2',
      '#e83e8c',
    ];

    for (let i = 1; i <= quantity; i++) {
      let start: DateTime;
      let end: DateTime;
      const randomDuration = (Math.floor(Math.random() * 3) + 1) * 30;

      if (i > 1 && i % 3 === 0) {
        const previousEvent = events[events.length - 1];
        start = previousEvent.start.plus({ minutes: 30 });
        end = start.plus({ minutes: randomDuration });
      } else {
        const randomDay = Math.floor(Math.random() * daysInMonth!) + 1;
        const randomStartHour = Math.floor(Math.random() * 10) + 8;
        const randomStartMinute = Math.floor(Math.random() * 4) * 15;

        start = today.set({
          day: randomDay,
          hour: randomStartHour,
          minute: randomStartMinute,
          second: 0,
          millisecond: 0,
        });
        end = start.plus({ minutes: randomDuration });
      }

      events.push({
        id: i,
        title: titles[Math.floor(Math.random() * titles.length)],
        start: start,
        end: end,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    return events;
  }

  handleEventDropped(dropInfo: { event: CalendarEvent; newDate: DateTime; previousDate: DateTime }) {
    console.log(`Event "${dropInfo.event.title}" moved from ${dropInfo.previousDate.toLocaleString()} to ${dropInfo.newDate.toLocaleString()}`);
  
  }

  handleEventClicked(event: CalendarEvent) {
    console.log('Event clicked in application:', event);
    alert(`Event: ${event.title}`);
  }

  codeSnippetModule = `
import { ChronoCalendarComponent } from 'chrono-calendar';

@Component({
  ...
  imports: [ChronoCalendarComponent],
  ...
})
export class YourComponent { ... }`;

  codeSnippetHtml = `
<chrono-calendar
  [events]="myEvents"
  [initialView]="'monthly'"
  [enableDragDrop]="true"
  [todayButtonText]="'Today'"
  [monthViewText]="'Month'"
  [weekViewText]="'Week'"
  [dayViewText]="'Day'"
  (eventClicked)="handleEventClicked($event)"
  (eventDropped)="handleEventDropped($event)">
</chrono-calendar>`;

  codeSnippetTs = `
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'chrono-calendar';
import { DateTime } from 'luxon';

@Component({ ... })
export class YourComponent implements OnInit {

  myEvents: CalendarEvent[] = [];

  ngOnInit(): void {
    this.myEvents = this.generateRandomEvents(20);
  }

  private generateRandomEvents(quantity: number): CalendarEvent[] {
    // Generate your events here
    return [];
  }

  handleEventClicked(event: CalendarEvent) {
    alert(\`Event: \${event.title}\`);
  }

  handleEventDropped(dropInfo: { event: CalendarEvent; newDate: DateTime; previousDate: DateTime }) {
    console.log(\`Event "\${dropInfo.event.title}" moved\`);
    // Update your backend here
    // this.calendarService.updateEvent(dropInfo.event).subscribe();
  }
}`;
}
