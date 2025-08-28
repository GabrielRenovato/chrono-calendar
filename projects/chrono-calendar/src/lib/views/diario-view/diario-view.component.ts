import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { DiaCalendario, EventoCalendario } from '../../calendar.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-diario-view',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './diario-view.component.html',
  styleUrl: './diario-view.component.scss',
})
export class DiarioViewComponent implements OnChanges {
  @Input() dia: DiaCalendario | undefined;
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();

  eventLayouts = new Map<string | number, object>();

  horasDoDia: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_POR_HORA = 80;
  private PIXELS_POR_MINUTO = this.PIXELS_POR_HORA / 60;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dia'] && this.dia) {
      this.calcularLayoutDosEventos(this.dia.eventos);
    }
  }

  private calcularLayoutDosEventos(eventos: EventoCalendario[]): void {
    this.eventLayouts.clear();
    if (eventos.length === 0) {
      return;
    }

    const eventosOrdenados = [...eventos].sort(
      (a, b) => a.inicio.toMillis() - b.inicio.toMillis()
    );

    const colunas: EventoCalendario[][] = [];
    for (const evento of eventosOrdenados) {
      let colunaEncontrada = false;
      for (const coluna of colunas) {
        const ultimoEventoNaColuna = coluna[coluna.length - 1];
        if (ultimoEventoNaColuna.fim <= evento.inicio) {
          coluna.push(evento);
          colunaEncontrada = true;
          break;
        }
      }
      if (!colunaEncontrada) {
        colunas.push([evento]);
      }
    }

    const totalDeColunas = colunas.length;
    for (let i = 0; i < totalDeColunas; i++) {
      for (const evento of colunas[i]) {
        const minutosDesdeMeiaNoite =
          evento.inicio.hour * 60 + evento.inicio.minute;
        const duracaoEmMinutos = evento.fim.diff(
          evento.inicio,
          'minutes'
        ).minutes;

        const largura = 100 / totalDeColunas;
        const esquerda = i * largura;

        const estilos: any = {
          top: `${minutosDesdeMeiaNoite * this.PIXELS_POR_MINUTO}px`,
          height: `${Math.max(
            20,
            duracaoEmMinutos * this.PIXELS_POR_MINUTO
          )}px`,
          left: `${esquerda}%`,
          width: `${largura}%`,
          zIndex: i + 10,
        };

        if (i > 0) {
          estilos['borderLeft'] = '2px solid white';
        }

        this.eventLayouts.set(evento.id, estilos);
      }
    }
  }
}
