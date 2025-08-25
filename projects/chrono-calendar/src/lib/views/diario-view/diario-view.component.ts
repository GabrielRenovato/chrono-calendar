import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaCalendario, EventoCalendario } from '../../calendar.model';

@Component({
  selector: 'app-diario-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diario-view.component.html',
  styleUrl: './diario-view.component.scss',
})
export class DiarioViewComponent {
  @Input() dia: DiaCalendario | undefined;
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();

  horasDoDia: string[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, '0')}:00`
  );

  private PIXELS_POR_HORA = 80;
  private PIXELS_POR_MINUTO = this.PIXELS_POR_HORA / 60;

  calcularPosicaoEvento(evento: EventoCalendario): number {
    const minutosDesdeMeiaNoite =
      evento.inicio.getHours() * 60 + evento.inicio.getMinutes();
    return minutosDesdeMeiaNoite * this.PIXELS_POR_MINUTO;
  }

  calcularAlturaEvento(evento: EventoCalendario): number {
    const duracaoEmMinutos =
      (evento.fim.getTime() - evento.inicio.getTime()) / (1000 * 60);
    const alturaMinima = 20;
    const alturaCalculada = duracaoEmMinutos * this.PIXELS_POR_MINUTO;
    return Math.max(alturaCalculada, alturaMinima);
  }
}
