# ⏳ Chrono Calendar

A modern, responsive, and customizable calendar library for **Angular** applications.  
Built with **Signals** and **standalone components** for simple and performant integration.

---

## 🎥 Demo

Visit the official website to view examples and test the features:

🔗 https://chronocalendar.netlify.app/

---

## ✨ Features

- **Multiple Views** → Easily switch between **monthly**, **weekly**, and **daily** views.
- **Standalone Components** → Integrate into any modern Angular project **without NgModules**.
- **Simple API** → Use **@Input** to provide events and **@Output** to capture interactions.
- **Minimal and Robust Dependencies** → Uses **Luxon** for precise and reliable date manipulation.
- **Lightweight and Performant** → Built with **Signals** for maximum reactivity.
- **Internationalization Ready** → Customizable button texts for any language.
- **Automatic Locale Detection** → Date formatting adapts to the user's browser locale.

---

## 💾 Installation

Since the library uses **Luxon** for date manipulation, install both packages:

```bash
npm install chrono-calendar luxon
```

> **Tip:** If you need Luxon types, install them as well:
```bash
npm install -D @types/luxon
```

---

## 🚀 How to Use

Integrating **Chrono Calendar** is simple and done in three steps:

### 1) Import the Component and Luxon

```typescript
// in your-component.component.ts
import { Component } from '@angular/core';
import { ChronoCalendarComponent, CalendarEvent } from 'chrono-calendar';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [ChronoCalendarComponent], // Add the component here
  templateUrl: './your-page.component.html',
})
export class YourPageComponent {
  // ...
}
```

### 2) Add to Template and Provide Data

```html
<div style="height: 90vh;">
  <chrono-calendar
    [events]="myEvents"
    [initialView]="'weekly'"
    [todayButtonText]="'Today'"
    [monthViewText]="'Month'"
    [weekViewText]="'Week'"
    [dayViewText]="'Day'"
    (eventClicked)="handleEventClicked($event)"
  >
  </chrono-calendar>
</div>
```

### 3) Prepare Event Data (Using Luxon)

```typescript
// in your-component.component.ts
export class YourPageComponent {
  myEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      start: DateTime.fromISO('2025-08-25T10:00:00'),
      end: DateTime.fromISO('2025-08-25T11:00:00'),
      color: '#0d6efd', // Blue
    },
    {
      id: 2,
      title: 'Client Lunch',
      start: DateTime.fromISO('2025-08-26T12:30:00'),
      end: DateTime.fromISO('2025-08-26T14:00:00'),
      color: '#198754', // Green
    },
  ];

  handleEventClicked(event: CalendarEvent) {
    console.log('Event clicked:', event.title, event.start.toISO());
    alert(`Event: ${event.title}`);
  }
}
```

---

## ⚙️ Properties API

### Inputs (`@Input`)

| Property            | Type                                 | Default     | Description                                   |
|---------------------|--------------------------------------|-------------|-----------------------------------------------|
| `events`            | `CalendarEvent[]`                    | `[]`        | List of events displayed in the calendar.     |
| `initialView`       | `'monthly' \| 'weekly' \| 'daily'`   | `'monthly'` | Sets the initial view.                        |
| `todayButtonText`   | `string`                             | `'Today'`   | Text for the "Today" button.                  |
| `monthViewText`     | `string`                             | `'Month'`   | Text for the **Monthly** view button.         |
| `weekViewText`      | `string`                             | `'Week'`    | Text for the **Weekly** view button.          |
| `dayViewText`       | `string`                             | `'Day'`     | Text for the **Daily** view button.           |

### Outputs (`@Output`)

| Event                | Returns                              | Description                                      |
|----------------------|--------------------------------------|--------------------------------------------------|
| `eventClicked`       | `CalendarEvent`                      | Fired when an event is clicked.                  |
| `dayClicked`         | `DateTime`                           | Fired when clicking on a day cell.               |
| `viewChange`         | `'monthly' \| 'weekly' \| 'daily'`   | Fired when switching the view type.              |
| `monthChange`        | `{ start: DateTime, end: DateTime }` | Fired when the visible date range changes.       |

---

## 🌍 Internationalization

The calendar supports multiple languages through customizable button texts.

**Portuguese Example**

```html
<chrono-calendar
  [events]="myEvents"
  [todayButtonText]="'Hoje'"
  [monthViewText]="'Mês'"
  [weekViewText]="'Semana'"
  [dayViewText]="'Dia'"
></chrono-calendar>
```

**Spanish Example**

```html
<chrono-calendar
  [events]="myEvents"
  [todayButtonText]="'Hoy'"
  [monthViewText]="'Mes'"
  [weekViewText]="'Semana'"
  [dayViewText]="'Día'"
></chrono-calendar>
```

Date formatting automatically adapts to the user's browser locale, so dates will appear in the appropriate format for each user's location.

---

## 📅 `CalendarEvent` Interface

```typescript
import { DateTime } from 'luxon';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: DateTime;
  end: DateTime;
  color?: string;
  layout?: {
    width: number;     // In %
    left: number;      // In %
    column: number;
    totalColumns: number;
  };
}
```

---

## 🎨 Styling

The calendar comes with default styling, but you can customize it by overriding the CSS classes. All components use semantic class names for easy customization.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.
