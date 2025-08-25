import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaCalendario, EventoCalendario } from '../../calendar.model';

@Component({
  selector: 'app-mensal-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensal-view.component.html',
  styleUrl: './mensal-view.component.scss',
})
export class MensalViewComponent {
  @Input() dias: DiaCalendario[] = [];
  @Output() diaClicado = new EventEmitter<Date>();
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();

  diasDaSemana: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
}
