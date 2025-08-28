import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChronoCalendarComponent } from 'projects/chrono-calendar/src/lib/chrono-calendar/chrono-calendar.component';
import { EventoCalendario } from 'projects/chrono-calendar/src/public-api';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-basic-usage',
  standalone: true,
  imports: [CommonModule, ChronoCalendarComponent],
  templateUrl: './basic-usage.component.html',
  styleUrl: './basic-usage.component.scss',
})
export class BasicUsageComponent implements OnInit {
  meusEventos: EventoCalendario[] = [];

  ngOnInit(): void {
    this.meusEventos = this.gerarEventosAleatorios(20);
  }

  private gerarEventosAleatorios(quantidade: number): EventoCalendario[] {
    const eventos: EventoCalendario[] = [];
    const hoje = DateTime.now();
    const diasNoMes = hoje.daysInMonth;

    const titulos = [
      'Reunião de Alinhamento',
      'Daily Scrum',
      'Entrevista Candidato',
      'Almoço com Cliente',
      'Planejamento da Sprint',
      'Sessão de Brainstorm',
      'Apresentação de Resultados testando tooltip',
      'Consulta Médica',
      'Workshop de Design',
    ];
    const cores = [
      '#007bff',
      '#28a745',
      '#dc3545',
      '#ffc107',
      '#17a2b8',
      '#6f42c1',
      '#6610f2',
      '#e83e8c',
    ];

    for (let i = 1; i <= quantidade; i++) {
      let inicio: DateTime;
      let fim: DateTime;
      const duracaoAleatoria = (Math.floor(Math.random() * 3) + 1) * 30;

      if (i > 1 && i % 3 === 0) {
        const eventoAnterior = eventos[eventos.length - 1];

        inicio = eventoAnterior.inicio.plus({ minutes: 30 });
        fim = inicio.plus({ minutes: duracaoAleatoria });
      } else {
        const diaAleatorio = Math.floor(Math.random() * diasNoMes!) + 1;
        const horaInicioAleatoria = Math.floor(Math.random() * 10) + 8;
        const minutoInicioAleatorio = Math.floor(Math.random() * 4) * 15;

        inicio = hoje.set({
          day: diaAleatorio,
          hour: horaInicioAleatoria,
          minute: minutoInicioAleatorio,
          second: 0,
          millisecond: 0,
        });
        fim = inicio.plus({ minutes: duracaoAleatoria });
      }

      eventos.push({
        id: i,
        titulo: titulos[Math.floor(Math.random() * titulos.length)],
        inicio: inicio,
        fim: fim,
        cor: cores[Math.floor(Math.random() * cores.length)],
      });
    }

    return eventos;
  }

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
import { Component, OnInit } from '@angular/core';
import { EventoCalendario } from 'chrono-calendar';
import { DateTime } from 'luxon';

@Component({ ... })
export class SeuComponente implements OnInit {

  meusEventos: EventoCalendario[] = [];

  ngOnInit(): void {
    this.meusEventos = this.gerarEventosAleatorios(20);
  }

  private gerarEventosAleatorios(quantidade: number): EventoCalendario[] {
    
    return [];
  }

  handleEventoClicado(evento: EventoCalendario) {
    alert(\`Evento: \${evento.titulo}\`);
  }
}`;
}
