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
import { DateTime, Info } from 'luxon';

@Component({
  selector: 'app-semanal-view',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './semanal-view.component.html',
  styleUrl: './semanal-view.component.scss',
})
export class SemanalViewComponent implements OnChanges {
  @Input() dias: DiaCalendario[] = [];
  @Output() diaClicado = new EventEmitter<DateTime>();
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();

  eventLayouts = new Map<string | number, object>();
  private maxZIndex = 10;
  diasDaSemana: string[] = Info.weekdays('short', { locale: 'pt-BR' }).map(
    (dia) => dia.charAt(0).toUpperCase() + dia.slice(1, 3)
  );
  horasDoDia: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_POR_HORA = 80;
  private PIXELS_POR_MINUTO = this.PIXELS_POR_HORA / 60;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dias'] && this.dias.length > 0) {
      this.calcularLayoutsParaSemana();
    }
  }

  private calcularLayoutsParaSemana(): void {
    this.eventLayouts.clear();

    for (const dia of this.dias) {
      if (dia.eventos.length === 0) {
        continue;
      }

      const eventosOrdenados = [...dia.eventos].sort(
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

          const DESLOCAMENTO_CASCATA_PERCENT = 12;

          const largura =
            100 - (totalDeColunas - 1) * DESLOCAMENTO_CASCATA_PERCENT;
          const esquerda = i * DESLOCAMENTO_CASCATA_PERCENT;
          const zIndex = i + 10;

          const estilos: any = {
            top: `${minutosDesdeMeiaNoite * this.PIXELS_POR_MINUTO}px`,
            height: `${Math.max(
              20,
              duracaoEmMinutos * this.PIXELS_POR_MINUTO
            )}px`,
            left: `${esquerda}%`,
            width: `${largura}%`,
            zIndex: zIndex,
          };

          if (i > 0) {
            estilos['border'] = '1px solid white';
          }

          this.eventLayouts.set(evento.id, estilos);
        }
      }
    }
  }

  bringEventToFront(evento: EventoCalendario): void {
    const currentStyle = this.eventLayouts.get(evento.id) as any;
    if (!currentStyle) return;

    this.maxZIndex++;
    const newStyle = { ...currentStyle, zIndex: this.maxZIndex };

    this.eventLayouts.set(evento.id, newStyle);

    this.eventoClicado.emit(evento);
  }
}
