# ⏳ Chrono Calendar

Uma biblioteca de calendário moderna, responsiva e personalizável para aplicações **Angular**.  
Construída com **Signals** e **componentes standalone** para uma integração simples e performática.

---

## 🎥 Demonstração

Acesse o site oficial para visualizar exemplos e testar as funcionalidades:

🔗 [https://chronocalendar.netlify.app/](https://chronocalendar.netlify.app/)

---

## ✨ Funcionalidades

- **Múltiplas Visualizações** → Alterne facilmente entre **mensal**, **semanal** e **diária**.
- **Componentes Standalone** → Integre em qualquer projeto Angular moderno **sem necessidade de NgModules**.
- **API Simples** → Use **@Input** para fornecer eventos e **@Output** para capturar interações.
- **Dependência Mínima e Robusta** → Utiliza **Luxon** para manipulação de datas precisa e confiável.
- **Leve e Performático** → Construído com **Signals** para máxima reatividade.

---

## 💾 Instalação

Como a biblioteca usa **Luxon** para manipulação de datas, instale os dois pacotes:

```bash
npm install chrono-calendar luxon
```

> **Dica:**  
> Caso precise dos tipos do Luxon, instale-os também:
```bash
npm install -D @types/luxon
```

---

## 🚀 Como Usar

A integração do **Chrono Calendar** é simples e feita em três passos:

---

### **1. Importe o Componente e o Luxon**

```typescript
// no seu-componente.component.ts
import { Component } from '@angular/core';
import { ChronoCalendarComponent, EventoCalendario } from 'chrono-calendar';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-sua-pagina',
  standalone: true,
  imports: [ChronoCalendarComponent], // Adicione o componente aqui
  templateUrl: './sua-pagina.component.html',
})
export class SuaPaginaComponent {
  // ...
}
```

---

### **2. Adicione ao Template e Forneça os Dados**

```html
<div style="height: 90vh;">
  <chrono-calendar
    [eventos]="meusEventos"
    [visualizacaoInicial]="'semanal'"
    (eventoClicado)="handleEventoClicado($event)"
  >
  </chrono-calendar>
</div>
```

---

### **3. Prepare os Dados dos Eventos (Usando Luxon)**

```typescript
// no seu-componente.component.ts
export class SuaPaginaComponent {
  meusEventos: EventoCalendario[] = [
    {
      id: 1,
      titulo: 'Reunião de Equipe',
      inicio: DateTime.fromISO('2025-08-25T10:00:00'),
      fim: DateTime.fromISO('2025-08-25T11:00:00'),
      cor: '#0d6efd', // Azul
    },
    {
      id: 2,
      titulo: 'Almoço com Cliente',
      inicio: DateTime.fromISO('2025-08-26T12:30:00'),
      fim: DateTime.fromISO('2025-08-26T14:00:00'),
      cor: '#198754', // Verde
    },
  ];

  handleEventoClicado(evento: EventoCalendario) {
    console.log('Evento clicado:', evento.titulo, evento.inicio.toISO());
    alert(`Evento: ${evento.titulo}`);
  }
}
```

---

## ⚙️ API de Propriedades

### **Entradas (@Input)**

| Propriedade           | Tipo                           | Padrão    | Descrição                                 |
|----------------------|--------------------------------|-----------|------------------------------------------|
| `eventos`           | `EventoCalendario[]`          | `[]`      | Lista de eventos exibidos no calendário. |
| `visualizacaoInicial` | `'mensal' \| 'semanal' \| 'diario'` | `'mensal'` | Define a visualização inicial.          |

---

### **Saídas (@Output)**

| Evento                 | Retorna                                  | Descrição                                                  |
|-----------------------|----------------------------------------|-----------------------------------------------------------|
| `eventoClicado`      | `EventoCalendario`                     | Disparado quando um evento é clicado.                     |
| `diaClicado`         | `DateTime`                             | Disparado ao clicar em uma célula de dia.                 |
| `mudancaDeVisualizacao` | `'mensal' \| 'semanal' \| 'diario'` | Disparado ao trocar o tipo de visualização.               |
| `mudancaDeMes`       | `{ inicio: DateTime, fim: DateTime }` | Disparado quando o intervalo de datas visível muda.       |