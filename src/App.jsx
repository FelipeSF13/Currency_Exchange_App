
import { useEffect, useState } from "react";
import Header from "./components/Header";
import CurrencyCard from "./components/CurrencyCard";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");

  const [rate, setRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      setRate(null);
      setRateDate(null);
      setError("");

      if (fromCurrency === toCurrency) {
        setRate(1);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const url =
          `https://api.frankfurter.dev/v2/rate/` +
          `${fromCurrency}/${toCurrency}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Não foi possível consultar a cotação.");
        }

        const data = await response.json();

        if (
          typeof data.rate !== "number" ||
          !Number.isFinite(data.rate)
        ) {
          throw new Error("A API retornou uma cotação inválida.");
        }

        if (controller.signal.aborted) return;

        setRate(data.rate);
        setRateDate(data.date);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro inesperado."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRate();

    return () => controller.abort();
  }, [fromCurrency, toCurrency]);

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

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

        <CurrencyCard
          amount={amount}
          onAmountChange={setAmount}
          fromCurrency={fromCurrency}
          onFromCurrencyChange={setFromCurrency}
          toCurrency={toCurrency}
          onToCurrencyChange={setToCurrency}
          onSwap={handleSwap}
          rate={rate}
          rateDate={rateDate}
          loading={loading}
          error={error}
        />

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
