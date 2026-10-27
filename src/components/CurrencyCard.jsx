
import CurrencyInput from "./CurrencyInput";

const currencies = [
  { code: "BRL", name: "Real brasileiro" },
  { code: "USD", name: "Dólar americano" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra esterlina" },
  { code: "JPY", name: "Iene japonês" },
  { code: "CAD", name: "Dólar canadense" },
];

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value);
}

export default function CurrencyCard({
  amount,
  onAmountChange,
  fromCurrency,
  onFromCurrencyChange,
  toCurrency,
  onToCurrencyChange,
  onSwap,
  rate,
  rateDate,
  loading,
  error,
}) {
  const numericAmount = Number(amount);

  const isValidAmount =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 0;

  const convertedAmount =
    rate !== null && isValidAmount
      ? numericAmount * rate
      : null;

  let resultMessage = "Aguardando cotação...";

  if (!isValidAmount) {
    resultMessage = "Digite um valor válido.";
  } else if (loading) {
    resultMessage = "Consultando cotação...";
  } else if (error) {
    resultMessage = error;
  } else if (convertedAmount !== null) {
    resultMessage = formatCurrency(
      convertedAmount,
      toCurrency
    );
  }

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

      <div
        className="result-box"
        aria-live="polite"
        aria-busy={loading}
      >
        <span>Resultado da conversão</span>

        <strong>{resultMessage}</strong>

        {!loading && !error && rate !== null && (
          <small>
            1 {fromCurrency} ={" "}
            {rate.toLocaleString("pt-BR", {
              maximumFractionDigits: 6,
            })}{" "}
            {toCurrency}
          </small>
        )}

        {rateDate && !loading && !error && (
          <small>
            Cotação de referência: {rateDate}
          </small>
        )}

        <small>
          Dados de referência fornecidos pela Frankfurter.
        </small>
      </div>
    </section>
  );
}
