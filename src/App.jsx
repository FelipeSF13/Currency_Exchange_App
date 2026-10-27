
import Header from "./components/Header";
import CurrencyCard from "./components/CurrencyCard";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero">
          <span className="eyebrow">
            MERCADO DE CÂMBIO
          </span>

          <h1>
            Suas moedas,
            <br />
            <span>sob controle.</span>
          </h1>

          <p>
            Uma maneira simples de converter moedas,
            acompanhar cotações e analisar a evolução
            do mercado.
          </p>
        </section>

        <CurrencyCard />

        <section className="future-section">
          <h2>Análise de cotações</h2>

          <p>
            Em breve, você poderá visualizar gráficos,
            consultar históricos e exportar dados.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          Currency Exchange App • Projeto acadêmico
        </p>

        <p>
          Dados fornecidos pela Frankfurter API
        </p>
      </footer>
    </div>
  );
}
