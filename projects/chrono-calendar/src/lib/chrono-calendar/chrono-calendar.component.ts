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

  @Input() visualizacaoInicial: TipoDeVisualizacao = 'mensal';

  @Output() diaClicado = new EventEmitter<Date>();
  @Output() eventoClicado = new EventEmitter<EventoCalendario>();
  @Output() mudancaDeVisualizacao = new EventEmitter<TipoDeVisualizacao>();
  @Output() mudancaDeMes = new EventEmitter<{ inicio: Date; fim: Date }>();

  dataAtual = signal(new Date());
  visualizacaoAtual = signal<TipoDeVisualizacao>(this.visualizacaoInicial);
  eventosSignal = signal<{ [chave: string]: EventoCalendario[] }>({});

  tituloDoCabecalho = computed(() => {
    const data = this.dataAtual();
    switch (this.visualizacaoAtual()) {
      case 'mensal':
        return data.toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric',
        });
      case 'semanal':
        const inicioSemana = new Date(data);
        inicioSemana.setDate(data.getDate() - data.getDay());
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);
        return `${inicioSemana.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
        })} - ${fimSemana.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}`;
      case 'diario':
        return data.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
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
        const data = new Date(this.dataAtual());
        data.setHours(0, 0, 0, 0);
        const hoje = new Date();
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
    this.dataAtual.set(new Date());
  }

  private avancarRecuarData(data: Date, direcao: 1 | -1): Date {
    const novaData = new Date(data);
    switch (this.visualizacaoAtual()) {
      case 'mensal':
        novaData.setMonth(data.getMonth() + direcao);
        break;
      case 'semanal':
        novaData.setDate(data.getDate() + 7 * direcao);
        break;
      case 'diario':
        novaData.setDate(data.getDate() + direcao);
        break;
    }
    return novaData;
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

  private formatarChaveData(data: Date): string {
    return `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')}`;
  }

  private saoMesmoDia(data1: Date, data2: Date): boolean {
    return (
      data1.getFullYear() === data2.getFullYear() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getDate() === data2.getDate()
    );
  }

  private gerarDiasDoMes(): DiaCalendario[] {
    const ano = this.dataAtual().getFullYear();
    const mes = this.dataAtual().getMonth();
    const eventos = this.eventosSignal();
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const primeiroDiaDaSemana = primeiroDiaDoMes.getDay();
    const totalDeDias = ultimoDiaDoMes.getDate();
    let dias: DiaCalendario[] = [];
    const hoje = new Date();

    const ultimoDiaDoMesAnterior = new Date(ano, mes, 0).getDate();
    for (let i = primeiroDiaDaSemana; i > 0; i--) {
      dias.push({
        data: new Date(ano, mes - 1, ultimoDiaDoMesAnterior - i + 1),
        eMesAtual: false,
        eHoje: false,
        eventos: [],
      });
    }

    for (let i = 1; i <= totalDeDias; i++) {
      const data = new Date(ano, mes, i);
      const chaveData = this.formatarChaveData(data);
      dias.push({
        data,
        eMesAtual: true,
        eHoje: this.saoMesmoDia(data, hoje),
        eventos: eventos[chaveData] || [],
      });
    }

    const ultimoDiaDaSemana = ultimoDiaDoMes.getDay();
    for (let i = 1; i <= 6 - ultimoDiaDaSemana; i++) {
      dias.push({
        data: new Date(ano, mes + 1, i),
        eMesAtual: false,
        eHoje: false,
        eventos: [],
      });
    }
    return dias;
  }

  private gerarDiasDaSemana(): DiaCalendario[] {
    const dataBase = this.dataAtual();
    const eventos = this.eventosSignal();
    const inicioSemana = new Date(dataBase);
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());

    let dias: DiaCalendario[] = [];
    const hoje = new Date();

    for (let i = 0; i < 7; i++) {
      const data = new Date(inicioSemana);
      data.setDate(inicioSemana.getDate() + i);
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
