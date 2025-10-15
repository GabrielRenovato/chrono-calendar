# ⏳ Chrono Calendar

A **modern, responsive, and customizable calendar library** for **Angular** applications.  
Built with **Signals** and **standalone components** for simple and performant integration.

---

## 🎥 Demo

👉 [Live Demo & Documentation](https://chronocalendar.netlify.app/)

---

## ✨ Features

- 🗓️ **Multiple Views** → Switch between **monthly**, **weekly**, and **daily** views.
- 🎯 **Drag and Drop** → Move events easily between days and time slots.
- ⚙️ **Optional Drag & Drop** → Enable or disable via input.
- 🧩 **Standalone Components** → Works without `NgModules`.
- 🧠 **Simple API** → Use `@Input` and `@Output` for full control.
- 📅 **Powered by Luxon** → Reliable and precise date handling.
- ⚡ **Lightweight & Performant** → Built with Angular **Signals**.
- 🌍 **Internationalization Ready** → Customizable texts and automatic locale detection.

---

## 💾 Installation

```bash
npm install chrono-calendar luxon
```

> 💡 If you need Luxon types, install them too:
```bash
npm install -D @types/luxon
```

---

## 🚀 How to Use

### 1️⃣ Import the Component and Luxon

```typescript
import { Component } from '@angular/core';
import { ChronoCalendarComponent, CalendarEvent } from 'chrono-calendar';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-your-page',
  standalone: true,
  imports: [ChronoCalendarComponent],
  templateUrl: './your-page.component.html',
})
export class YourPageComponent {
  // ...
}
```

---

### 2️⃣ Add to Template and Provide Data

```html
<div style="height: 90vh;">
  <chrono-calendar
    [events]="myEvents"
    [initialView]="'weekly'"
    [enableDragDrop]="true"
    [todayButtonText]="'Today'"
    [monthViewText]="'Month'"
    [weekViewText]="'Week'"
    [dayViewText]="'Day'"
    (eventClicked)="handleEventClicked($event)"
    (eventDropped)="handleEventDropped($event)"
  >
  </chrono-calendar>
</div>
```

---

### 3️⃣ Prepare Event Data

```typescript
import { DateTime } from 'luxon';
import { CalendarEvent, EventDroppedInfo } from 'chrono-calendar';

export class YourPageComponent {
  myEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      start: DateTime.fromISO('2025-08-25T10:00:00'),
      end: DateTime.fromISO('2025-08-25T11:00:00'),
      color: '#0d6efd',
    },
    {
      id: 2,
      title: 'Client Lunch',
      start: DateTime.fromISO('2025-08-26T12:30:00'),
      end: DateTime.fromISO('2025-08-26T14:00:00'),
      color: '#198754',
    },
  ];

  handleEventClicked(event: CalendarEvent) {
    console.log('Event clicked:', event.title);
    alert(`Event: ${event.title}`);
  }

  handleEventDropped(info: EventDroppedInfo) {
    console.log('Event dropped:', info.event.title);
    console.log('New date:', info.newDate.toISO());
    console.log('Previous date:', info.previousDate.toISO());
  }
}
```

---

## ⚙️ Properties API

### 🔹 Inputs (`@Input`)

| Property | Type | Default | Description |
|-----------|------|----------|--------------|
| `events` | `CalendarEvent[]` | `[]` | List of events displayed in the calendar. |
| `initialView` | `'monthly' \| 'weekly' \| 'daily'` | `'monthly'` | Sets the initial view mode. |
| `enableDragDrop` | `boolean` | `true` | Enables or disables drag-and-drop functionality. |
| `todayButtonText` | `string` | `'Today'` | Label for the “Today” button. |
| `monthViewText` | `string` | `'Month'` | Label for the Month view button. |
| `weekViewText` | `string` | `'Week'` | Label for the Week view button. |
| `dayViewText` | `string` | `'Day'` | Label for the Day view button. |

---

### 🔹 Outputs (`@Output`)

| Event | Returns | Description |
|--------|----------|-------------|
| `eventClicked` | `CalendarEvent` | Fired when an event is clicked. |
| `dayClicked` | `DateTime` | Fired when a day cell is clicked. |
| `eventDropped` | `EventDroppedInfo` | Fired when an event is moved. |
| `viewChange` | `'monthly' \| 'weekly' \| 'daily'` | Fired when the view mode changes. |
| `monthChange` | `{ start: DateTime, end: DateTime }` | Fired when the visible range changes. |

---

## 🎯 Drag and Drop

Chrono Calendar has **built-in drag-and-drop** support for all views:

- 🗓️ **Monthly:** Move events between days  
- 📅 **Weekly:** Move events between time slots  
- 🕒 **Daily:** Reorganize event times  

Enable or disable as needed:

```html
<!-- Enable (default) -->
<chrono-calendar [enableDragDrop]="true"></chrono-calendar>

<!-- Disable -->
<chrono-calendar [enableDragDrop]="false"></chrono-calendar>
```

---

## 🌍 Internationalization (i18n)

Customize button labels easily.  
Date formatting adapts automatically to the user’s browser locale.

**Portuguese Example:**
```html
<chrono-calendar
  [todayButtonText]="'Hoje'"
  [monthViewText]="'Mês'"
  [weekViewText]="'Semana'"
  [dayViewText]="'Dia'"
></chrono-calendar>
```

**Spanish Example:**
```html
<chrono-calendar
  [todayButtonText]="'Hoy'"
  [monthViewText]="'Mes'"
  [weekViewText]="'Semana'"
  [dayViewText]="'Día'"
></chrono-calendar>
```

---

## 📘 Interfaces

```typescript
import { DateTime } from 'luxon';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: DateTime;
  end: DateTime;
  color?: string;
}

export interface EventDroppedInfo {
  event: CalendarEvent;
  newDate: DateTime;
  previousDate: DateTime;
}
```

---

## 🎨 Styling

Chrono Calendar includes default styles.  
You can **customize** it easily by overriding CSS classes using your own theme or stylesheet.

---

## 🤝 Contributing

Contributions are always welcome!  
If you’d like to improve Chrono Calendar, open a **Pull Request** or **Issue** on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.

---

Made with ❤️ by the Chrono Calendar team.
