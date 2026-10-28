
# Currency Exchange App

Aplicação web desenvolvida em React para conversão e análise de moedas, utilizando a API Frankfurter.

O projeto foi desenvolvido individualmente e de forma incremental, aplicando os conceitos estudados em React e registrando cada evolução no Git e GitHub.

## Sobre o projeto

O Currency Exchange App é uma Single Page Application (SPA) que permite consultar cotações de moedas, realizar conversões, visualizar dados históricos e analisar a evolução cambial.

A aplicação utiliza a identidade visual Midnight Finance, com uma interface responsiva em tons de azul-petróleo e verde-sálvia.

## Funcionalidades

- Conversão de moedas com dados da API Frankfurter.
- Seleção da moeda de origem e destino.
- Campo para informar o valor desejado.
- Botão para inverter as moedas.
- Exibição da cotação e da data de referência.
- Gráfico de evolução das cotações.
- Consulta histórica dos últimos 7, 30 e 90 dias.
- Tabela de registros históricos.
- Pesquisa de cotações por data.
- Ordenação por data ou valor da cotação.
- Exportação dos registros filtrados para CSV.
- Interface responsiva.
- Tratamento de carregamento e erros da API.

## Tecnologias utilizadas

- React
- JavaScript
- JSX
- Vite 8
- CSS3
- Recharts
- Frankfurter API
- Git e GitHub

## Conceitos aplicados

O desenvolvimento utiliza os seguintes conceitos:

- Componentização
- Props
- Eventos
- useState
- Lifting State Up
- useEffect
- Custom Hooks
- Fetch API
- Async/Await
- Manipulação de arrays e objetos
- Filtros e ordenação
- Gráficos
- Exportação CSV

## Estrutura do projeto

```text
src/
├── assets/
├── components/
│   ├── CurrencyCard.jsx
│   ├── CurrencyInput.jsx
│   ├── ExchangeChart.jsx
│   ├── ExchangeChart.css
│   ├── Header.jsx
│   ├── HistoryTable.jsx
│   └── HistoryTable.css
├── hooks/
│   ├── useExchangeHistory.js
│   └── useExchangeRate.js
├── utils/
│   └── exportCsv.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## API utilizada

A aplicação utiliza a API pública Frankfurter para consultar taxas de câmbio e dados históricos.

Site oficial: https://frankfurter.dev/

Exemplo de consulta de cotação:

```text
https://api.frankfurter.dev/v2/rate/BRL/USD
```

Exemplo de consulta histórica:

```text
https://api.frankfurter.dev/v2/rates?from=2026-10-01&to=2026-10-27&base=BRL&quotes=USD
```

Os dados são taxas de referência e não representam necessariamente os valores praticados por instituições financeiras.

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- Git

### Instalação

Clone o repositório:

```bash
git clone https://github.com/FelipeSF13/Currency_Exchange_App.git
```

Acesse a pasta:

```bash
cd Currency_Exchange_App
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço informado pelo Vite no navegador.

Normalmente:

```text
http://localhost:5173/
```

### Compilação para produção

```bash
npm run build
```

Os arquivos gerados serão armazenados na pasta `dist`.

## Organização dos componentes

### Header

Responsável pelo cabeçalho e pela identidade visual da aplicação.

### CurrencyCard

Apresenta os campos de conversão, as moedas selecionadas e o resultado calculado.

### CurrencyInput

Componente reutilizável utilizado para selecionar as moedas.

### ExchangeChart

Exibe o gráfico de evolução histórica das cotações.

### HistoryTable

Apresenta os registros históricos e permite pesquisar, ordenar e exportar os dados.

## Custom Hooks

### useExchangeRate

Responsável pela consulta da cotação entre as moedas selecionadas.

Utiliza useState, useEffect, fetch e async/await.

### useExchangeHistory

Responsável pela consulta das cotações históricas utilizadas no gráfico e na tabela.

## Exportação CSV

A função exportCsv gera um arquivo CSV contendo:

- Data da cotação.
- Moeda de origem.
- Moeda de destino.
- Valor da cotação.

A exportação considera os registros filtrados e ordenados na tabela.

O arquivo utiliza separador de ponto e vírgula e codificação UTF-8.

## Desenvolvimento incremental

O projeto foi desenvolvido por etapas:

1. Configuração inicial do React e Vite.
2. Criação dos componentes e identidade visual.
3. Implementação de Props, eventos e useState.
4. Aplicação de Lifting State Up.
5. Integração com a API Frankfurter.
6. Organização das consultas com Custom Hooks.
7. Implementação do gráfico histórico.
8. Criação da tabela com filtros e ordenação.
9. Implementação da exportação CSV.

As evoluções estão registradas no histórico de commits do GitHub.

## Testes

Durante o desenvolvimento foram realizados testes manuais de interface e compilação com Vite.

Os testes contemplaram o carregamento do conversor, consulta de cotações, seleção de moedas, renderização do gráfico e apresentação da tabela histórica.

A exportação CSV também deve ser conferida mediante abertura do arquivo gerado em um editor de planilhas.

Para executar a compilação:

```bash
npm run build
```

## Repositório

https://github.com/FelipeSF13/Currency_Exchange_App

## Autor

Felipe de Souza Freitas

## Contexto acadêmico

Projeto acadêmico individual desenvolvido para aplicação prática dos conteúdos de React, consumo de APIs, componentização, gerenciamento de estados, visualização e manipulação de dados.

## Referências

- React: https://react.dev/
- Vite: https://vite.dev/
- Recharts: https://recharts.org/
- Frankfurter API: https://frankfurter.dev/
```
