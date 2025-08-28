import { DateTime } from 'luxon'; // 1. Importe o DateTime

export type TipoDeVisualizacao = 'mensal' | 'semanal' | 'diario';

export interface EventoCalendario {
  id: string | number;
  titulo: string;
  inicio: DateTime; // 2. Substitua Date por DateTime
  fim: DateTime; // 3. Substitua Date por DateTime
  cor?: string;
  layout?: {
    largura: number; // Em %
    esquerda: number; // Em %
    coluna: number;
    totalColunas: number;
  };
}

export interface DiaCalendario {
  data: DateTime; // 4. Substitua Date por DateTime
  eventos: EventoCalendario[];
  eHoje: boolean;
  eMesAtual: boolean;
}
