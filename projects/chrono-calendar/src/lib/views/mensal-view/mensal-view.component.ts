import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaCalendario, EventoCalendario } from '../../calendar.model';
import { DateTime, Info } from 'luxon';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-mensal-view',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './mensal-view.component.html',
  styleUrl: './mensal-view.component.scss',
})
export class MensalViewComponent {
  @Input() dias: DiaCalendario[] = [];
  @Output() diaClicado = new EventEmitter<DateTime>();
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();

  diasDaSemana: string[] = Info.weekdays('short', { locale: 'pt-BR' });
}
