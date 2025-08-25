# ⏳ chrono-calendar

[![npm version](https://img.shields.io/npm/v/chrono-calendar.svg)](https://www.npmjs.com/package/chrono-calendar)
[![downloads](https://img.shields.io/npm/dt/chrono-calendar.svg)](https://www.npmjs.com/package/chrono-calendar)
[![license](https://img.shields.io/npm/l/chrono-calendar.svg)](https://github.com/seu-usuario/chrono-calendar/blob/main/LICENSE)

Biblioteca Angular para manipulação de calendários, datas e agendamento de eventos com facilidade.

---

## 📦 Instalação

```bash
npm install chrono-calendar
```

Ou, se estiver usando **yarn**:

```bash
yarn add chrono-calendar
```

Se o pacote for publicado com escopo:

```bash
npm install @seu-usuario/chrono-calendar
```

---

## 🚀 Como Usar

```ts
import { ChronoCalendarModule } from 'chrono-calendar';

@NgModule({
  imports: [ChronoCalendarModule],
})
export class AppModule {}
```

```ts
import { ChronoCalendarService } from 'chrono-calendar';

constructor(private chrono: ChronoCalendarService) {}

ngOnInit() {
  const hoje = this.chrono.getToday();
  console.log("Data de hoje:", hoje);
}
```

---

## 🛠 Publicando no NPM

### 1. Build da biblioteca

```bash
ng build chrono-calendar
```

Após o build, os arquivos estarão na pasta:

```
dist/chrono-calendar
```

### 2. Login no npm

```bash
npm login
```

### 3. Publicar pacote

```bash
cd dist/chrono-calendar
npm publish
```

> ⚠️ **Dica:** Se o nome `chrono-calendar` já existir, altere o `name` no `package.json`:

```json
{
  "name": "@seu-usuario/chrono-calendar"
}
```

---

## 🔄 Atualizando Versões

1. Alterar versão no `projects/chrono-calendar/package.json`:

```json
{
  "version": "0.0.2"
}
```

2. Recompilar:

```bash
ng build chrono-calendar
```

3. Publicar novamente:

```bash
cd dist/chrono-calendar
npm publish
```

---

## 📚 Documentação

Para mais exemplos e detalhes de configuração, acesse:  
[https://github.com/seu-usuario/chrono-calendar](https://github.com/seu-usuario/chrono-calendar)

---

## 🤝 Contribuindo

Contribuições são bem-vindas!  
Faça um **fork** do repositório, crie sua branch e envie um **Pull Request**.

```bash
git clone https://github.com/seu-usuario/chrono-calendar.git
cd chrono-calendar
npm install
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.  
Veja mais em [LICENSE](./LICENSE).

---

Desenvolvido com ❤️ por [Gabriel Renovato](https://github.com/seu-usuario)
