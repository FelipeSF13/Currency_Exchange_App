
export default function CurrencyCard() {
  return (
    <section className="currency-card">
      <div className="card-heading">
        <h2>Conversor de moedas</h2>

        <p>
          Consulte valores em diferentes moedas.
        </p>
      </div>

      <div className="field">
        <label>Valor</label>

        <div className="placeholder-field">
          1.000,00
        </div>
      </div>

      <div className="currency-grid">
        <div className="field">
          <label>Moeda de origem</label>

          <div className="placeholder-field">
            BRL — Real brasileiro
          </div>
        </div>

        <div className="field">
          <label>Moeda de destino</label>

          <div className="placeholder-field">
            USD — Dólar americano
          </div>
        </div>
      </div>

      <div className="result-box">
        <span>Resultado da conversão</span>

        <strong>Em breve</strong>

        <small>
          A conversão será implementada nas próximas etapas.
        </small>
      </div>
    </section>
  );
}
