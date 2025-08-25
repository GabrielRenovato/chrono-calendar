# ⏳ Chrono Calendar

Uma biblioteca de calendário moderna, responsiva e personalizável para aplicações Angular.  
Construída com **Signals** e **componentes standalone** para uma integração simples e performática.

---

## 🎥 Demonstração

Coloque aqui um GIF ou uma imagem do seu calendário em ação:

![Chrono Calendar Demo](URL_DA_SUA_IMAGEM_AQUI)

---

## ✨ Funcionalidades

- **Múltiplas Visualizações:** Alterne facilmente entre as visualizações **mensal**, **semanal** e **diária**.  
- **Componentes Standalone:** Integre facilmente em qualquer projeto Angular moderno **sem necessidade de NgModules**.  
- **API Simples:** Use `@Input` para fornecer eventos e `@Output` para ouvir interações do usuário.  
- **Sem Dependências Externas:** Estilizado com **CSS puro** e encapsulado, sem exigir Tailwind ou Bootstrap.  
- **Leve e Performático:** Construído com **Signals** para uma reatividade otimizada.

---

## 💾 Instalação

Instale a biblioteca no seu projeto Angular usando o **npm**:

```bash
npm install chrono-calendar
```

---

## 🚀 Como Usar

A integração da biblioteca é feita em poucos passos.

### **1. Importe o Componente**

No seu componente standalone, importe o **ChronoCalendarComponent** e os tipos necessários:

```ts
// no seu-componente.component.ts
import { Component } from '@angular/core';
import { ChronoCalendarComponent, EventoCalendario } from 'chrono-calendar';

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

Use o seletor `<chrono-calendar>` no seu template e passe a lista de eventos:

```html
<!-- no seu-pagina.component.html -->
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

### **3. Prepare os Dados dos Eventos**

No seu arquivo `.ts`, crie a lista de eventos e a função para lidar com os cliques:

```ts
// no seu-componente.component.ts
export class SuaPaginaComponent {
  meusEventos: EventoCalendario[] = [
    {
      id: 1,
      titulo: 'Reunião de Equipe',
      inicio: new Date('2025-08-25T10:00:00'),
      fim: new Date('2025-08-25T11:00:00'),
      cor: '#0d6efd', // Azul
    },
    {
      id: 2,
      titulo: 'Almoço com Cliente',
      inicio: new Date('2025-08-26T12:30:00'),
      fim: new Date('2025-08-26T14:00:00'),
      cor: '#198754', // Verde
    },
  ];

  handleEventoClicado(evento: EventoCalendario) {
    console.log('Evento clicado:', evento);
    alert(`Evento: ${evento.titulo}`);
  }
}
```

---

## ⚙️ API de Propriedades

Personalize e interaja com o calendário usando as seguintes propriedades.

### **Entradas (@Input)**

| Propriedade           | Tipo                               | Padrão   | Descrição                                      |
|----------------------|----------------------------------|-----------|------------------------------------------------|
| `eventos`           | `EventoCalendario[]`             | `[]`      | Lista de eventos exibidos no calendário.       |
| `visualizacaoInicial` | `'mensal' | 'semanal' | 'diario'` | `'mensal'` | Define qual visualização é carregada primeiro. |

---

### **Saídas (@Output)**

| Evento                | Retorna                 | Descrição                                                       |
|----------------------|------------------------|----------------------------------------------------------------|
| `eventoClicado`      | `EventoCalendario`     | Emitido quando o usuário clica em um evento.                   |
| `diaClicado`         | `Date`                | Emitido quando o usuário clica em uma célula de dia.           |
| `mudancaDeVisualizacao` | `'mensal' | 'semanal' | 'diario'` | Emitido ao trocar o tipo de visualização.                       |
| `mudancaDeMes`       | `{ inicio: Date, fim: Date }` | Emitido quando o intervalo de datas visível muda.              |

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.
