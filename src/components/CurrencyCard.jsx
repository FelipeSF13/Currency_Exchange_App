
import { useState } from "react";
import CurrencyInput from "./CurrencyInput";

const currencies = [
  { code: "BRL", name: "Real brasileiro" },
  { code: "USD", name: "Dólar americano" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra esterlina" },
  { code: "JPY", name: "Iene japonês" },
  { code: "CAD", name: "Dólar canadense" },
];

export default function CurrencyCard() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("BRL");
  const [toCurrency, setToCurrency] = useState("USD");

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <section className="currency-card">
      <div className="card-heading">
        <h2>Conversor de moedas</h2>
        <p>Selecione as moedas e informe o valor desejado.</p>
      </div>

      <div className="field">
        <label htmlFor="amount">Valor</label>

        <input
          id="amount"
          type="number"
          min="0"
          step="any"
          className="currency-select"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Digite um valor"
        />
      </div>

      <div className="currency-grid">
        <CurrencyInput
          id="fromCurrency"
          label="Moeda de origem"
          value={fromCurrency}
          onChange={setFromCurrency}
          currencies={currencies}
        />

        <CurrencyInput
          id="toCurrency"
          label="Moeda de destino"
          value={toCurrency}
          onChange={setToCurrency}
          currencies={currencies}
        />
      </div>

      <button
        type="button"
        className="swap-button"
        onClick={handleSwap}
      >
        ⇄ Inverter moedas
      </button>

      <div className="result-box" aria-live="polite">
        <span>Resultado da conversão</span>

        <strong>Em breve</strong>

        <small>
          {amount || "0"} {fromCurrency} para {toCurrency}.
          A cotação será integrada nas próximas etapas.
        </small>
      </div>
    </section>
  );
}
