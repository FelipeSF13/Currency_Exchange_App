
import { useState } from "react";

import Header from "./components/Header";
import CurrencyCard from "./components/CurrencyCard";
import ExchangeChart from "./components/ExchangeChart";
import HistoryTable from "./components/HistoryTable";

import useExchangeRate from "./hooks/useExchangeRate";
import useExchangeHistory from "./hooks/useExchangeHistory";

import "./App.css";

export default function App() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");
  const [days, setDays] = useState(30);

  const {
    rate,
    rateDate,
    loading,
    error,
  } = useExchangeRate(fromCurrency, toCurrency);

  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useExchangeHistory(
    fromCurrency,
    toCurrency,
    days
  );

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
          days={days}
          onDaysChange={setDays}
          history={history}
          loading={historyLoading}
          error={historyError}
        />

        <HistoryTable
          history={history}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          loading={historyLoading}
          error={historyError}
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
