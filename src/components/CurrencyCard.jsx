
import CurrencyInput from "./CurrencyInput";

const currencies = [
  { code: "BRL", name: "Real brasileiro" },
  { code: "USD", name: "Dólar americano" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra esterlina" },
  { code: "JPY", name: "Iene japonês" },
  { code: "CAD", name: "Dólar canadense" },
];

export default function CurrencyCard({
  amount,
  onAmountChange,
  fromCurrency,
  onFromCurrencyChange,
  toCurrency,
  onToCurrencyChange,
  onSwap,
}) {
  return (
    <section className="currency-card">
      <div className="card-heading">
        <h2>Conversor de moedas</h2>
        <p>
          Selecione as moedas e informe o valor desejado.
        </p>
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
          onChange={(event) =>
            onAmountChange(event.target.value)
          }
          placeholder="Digite um valor"
        />
      </div>

      <div className="currency-grid">
        <CurrencyInput
          id="fromCurrency"
          label="Moeda de origem"
          value={fromCurrency}
          onChange={onFromCurrencyChange}
          currencies={currencies}
        />

        <CurrencyInput
          id="toCurrency"
          label="Moeda de destino"
          value={toCurrency}
          onChange={onToCurrencyChange}
          currencies={currencies}
        />
      </div>

      <button
        type="button"
        className="swap-button"
        onClick={onSwap}
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
