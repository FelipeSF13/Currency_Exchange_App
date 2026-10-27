
import { useState } from "react";
import Header from "./components/Header";
import CurrencyCard from "./components/CurrencyCard";
import ExchangeChart from "./components/ExchangeChart";
import useExchangeRate from "./hooks/useExchangeRate";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");

  const {
    rate,
    rateDate,
    loading,
    error,
  } = useExchangeRate(fromCurrency, toCurrency);

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

        <ExchangeChart
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
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
