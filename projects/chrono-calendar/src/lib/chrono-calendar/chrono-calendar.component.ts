import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensalViewComponent } from '../views/mensal-view/mensal-view.component';
import {
  DiaCalendario,
  EventoCalendario,
  TipoDeVisualizacao,
} from '../calendar.model';
import { SemanalViewComponent } from '../views/semanal-view/semanal-view.component';
import { DiarioViewComponent } from '../views/diario-view/diario-view.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'chrono-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MensalViewComponent,
    SemanalViewComponent,
    DiarioViewComponent,
  ],
  templateUrl: './chrono-calendar.component.html',
  styleUrl: './chrono-calendar.component.scss',
})
export class ChronoCalendarComponent implements OnInit {
  @Input()
  set eventos(listaEventos: EventoCalendario[]) {
    this.eventosSignal.set(this.mapearEventosPorDia(listaEventos));
  }
  dataAtual = signal(DateTime.now());
  @Input() visualizacaoInicial: TipoDeVisualizacao = 'mensal';

  @Output() diaClicado = new EventEmitter<DateTime>();
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();
  @Output() mudancaDeVisualizacao = new EventEmitter<TipoDeVisualizacao>();
  @Output() mudancaDeMes = new EventEmitter<{
    inicio: DateTime;
    fim: DateTime;
  }>();

  visualizacaoAtual = signal<TipoDeVisualizacao>(this.visualizacaoInicial);
  eventosSignal = signal<{ [chave: string]: EventoCalendario[] }>({});

  tituloDoCabecalho = computed(() => {
    const data = this.dataAtual();
    switch (this.visualizacaoAtual()) {
      case 'mensal':
        return data.toFormat('LLLL yyyy', { locale: 'pt-BR' });
      case 'semanal':
        const inicioSemana = data.startOf('week');
        const fimSemana = data.endOf('week');

        return `${inicioSemana.toFormat("dd 'de' LLLL", {
          locale: 'pt-BR',
        })} - ${fimSemana.toFormat("dd 'de' LLLL 'de' yyyy", {
          locale: 'pt-BR',
        })}`;
      case 'diario':
        return data.toFormat("cccc, dd 'de' LLLL 'de' yyyy", {
          locale: 'pt-BR',
        });
      default:
        return '';
    }
  });

  diasParaExibir = computed((): DiaCalendario[] => {
    switch (this.visualizacaoAtual()) {
      case 'mensal':
        return this.gerarDiasDoMes();

      case 'semanal':
        return this.gerarDiasDaSemana();

      case 'diario':
        const data = this.dataAtual().startOf('day');

        const hoje = DateTime.now();

        const chaveData = this.formatarChaveData(data);

        return [
          {
            data: data,
            eMesAtual: true,

            eHoje: this.saoMesmoDia(data, hoje),

            eventos: this.eventosSignal()[chaveData] || [],
          },
        ];

      default:
        return [];
    }
  });

  ngOnInit() {
    this.visualizacaoAtual.set(this.visualizacaoInicial);
  }

  definirVisualizacao(tipo: TipoDeVisualizacao): void {
    this.visualizacaoAtual.set(tipo);
    this.mudancaDeVisualizacao.emit(tipo);
  }

  irParaAnterior(): void {
    this.dataAtual.update((data) => this.avancarRecuarData(data, -1));
  }

  irParaProximo(): void {
    this.dataAtual.update((data) => this.avancarRecuarData(data, 1));
  }

  irParaHoje(): void {
    this.dataAtual.set(DateTime.now());
  }

  private avancarRecuarData(data: DateTime, direcao: 1 | -1): DateTime {
    switch (this.visualizacaoAtual()) {
      case 'mensal':
        return data.plus({ months: direcao });
      case 'semanal':
        return data.plus({ weeks: direcao });
      case 'diario':
        return data.plus({ days: direcao });
    }
    return data;
  }

  private mapearEventosPorDia(eventos: EventoCalendario[]): {
    [chave: string]: EventoCalendario[];
  } {
    const mapa: { [chave: string]: EventoCalendario[] } = {};
    for (const evento of eventos) {
      const chave = this.formatarChaveData(evento.inicio);
      if (!mapa[chave]) {
        mapa[chave] = [];
      }
      mapa[chave].push(evento);
    }
    return mapa;
  }

  private formatarChaveData(data: DateTime): string {
    return data.toISODate() as string;
  }

  private saoMesmoDia(data1: DateTime, data2: DateTime): boolean {
    return data1.hasSame(data2, 'day');
  }

  private gerarDiasDoMes(): DiaCalendario[] {
    const dataReferencia = this.dataAtual();
    const eventos = this.eventosSignal();
    const hoje = DateTime.now();

    const primeiroDiaDoMes = dataReferencia.startOf('month');
    let diaCorrente = primeiroDiaDoMes.startOf('week');

    const dias: DiaCalendario[] = [];

    for (let i = 0; i < 42; i++) {
      const chaveData = this.formatarChaveData(diaCorrente);
      dias.push({
        data: diaCorrente,
        eMesAtual: diaCorrente.month === dataReferencia.month,
        eHoje: this.saoMesmoDia(diaCorrente, hoje),
        eventos: eventos[chaveData] || [],
      });
      diaCorrente = diaCorrente.plus({ days: 1 });
    }
    return dias;
  }

  private gerarDiasDaSemana(): DiaCalendario[] {
    const dataBase = this.dataAtual();
    const eventos = this.eventosSignal();
    const inicioSemana = dataBase.startOf('week');
    const hoje = DateTime.now();

    const dias: DiaCalendario[] = [];

    for (let i = 0; i < 7; i++) {
      const data = inicioSemana.plus({ days: i });
      const chaveData = this.formatarChaveData(data);
      dias.push({
        data,
        eMesAtual: true,
        eHoje: this.saoMesmoDia(data, hoje),
        eventos: eventos[chaveData] || [],
      });
    }
    return dias;
  }
}
