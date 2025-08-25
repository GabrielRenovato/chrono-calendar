export type TipoDeVisualizacao = 'mensal' | 'semanal' | 'diario';

export interface EventoCalendario {
  id: string | number;
  titulo: string;
  inicio: Date;
  fim: Date;
  cor?: string;
}

export interface DiaCalendario {
  data: Date;
  eventos: EventoCalendario[];
  eHoje: boolean;
  eMesAtual: boolean;
}
