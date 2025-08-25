import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChronoCalendarComponent } from 'projects/chrono-calendar/src/lib/chrono-calendar/chrono-calendar.component';
import { EventoCalendario } from 'projects/chrono-calendar/src/public-api';

@Component({
  selector: 'app-basic-usage',
  standalone: true,
  imports: [CommonModule, ChronoCalendarComponent],
  templateUrl: './basic-usage.component.html',
  styleUrl: './basic-usage.component.scss',
})
export class BasicUsageComponent {
  meusEventos: EventoCalendario[] = [
    {
      id: 1,
      titulo: 'Reunião de Equipe',
      inicio: new Date('2025-08-25T10:00:00'),
      fim: new Date('2025-08-25T11:00:00'),
      cor: '#007bff',
    },
    {
      id: 2,
      titulo: 'Almoço com Cliente',
      inicio: new Date('2025-08-26T12:30:00'),
      fim: new Date('2025-08-26T14:00:00'),
      cor: '#28a745',
    },
    {
      id: 3,
      titulo: 'Entrevista',
      inicio: new Date('2025-08-24T14:00:00'),
      fim: new Date('2025-08-24T15:30:00'),
      cor: '#FF5733',
    },
  ];

  handleEventoClicado(evento: EventoCalendario) {
    console.log('Evento clicado na aplicação:', evento);
    alert(`Evento: ${evento.titulo}`);
  }

  codeSnippetModule = `
import { ChronoCalendarComponent } from 'chrono-calendar';

@Component({
  ...
  imports: [ChronoCalendarComponent],
  ...
})
export class SeuComponente { ... }`;

  codeSnippetHtml = `
<chrono-calendar
  [eventos]="meusEventos"
  [visualizacaoInicial]="'mensal'"
  (eventoClicado)="handleEventoClicado($event)">
</chrono-calendar>`;

  codeSnippetTs = `
import { EventoCalendario } from 'chrono-calendar';

// ...

meusEventos: EventoCalendario[] = [
  {
    id: 1,
    titulo: 'Reunião de Equipe',
    inicio: new Date('2025-08-25T10:00:00'),
    fim: new Date('2025-08-25T11:00:00'),
    cor: '#007bff',
  },
  // ... mais eventos
];

handleEventoClicado(evento: EventoCalendario) {
  alert(\`Evento: \${evento.titulo}\`);
}`;
}
