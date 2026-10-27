
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./ExchangeChart.css";

const periods = [
  { label: "7 dias", value: 7 },
  { label: "30 dias", value: 30 },
  { label: "90 dias", value: 90 },
];

function formatDate(date) {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

function formatRate(value) {
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export default function ExchangeChart({
  fromCurrency,
  toCurrency,
  days,
  onDaysChange,
  history,
  loading,
  error,
}) {
  const sameCurrency = fromCurrency === toCurrency;

  const chartData = history.map((item) => ({
    ...item,
    label: formatDate(item.date),
  }));

  const first = history[0];
  const last = history[history.length - 1];

  const variation =
    first && last && first.rate !== 0
      ? ((last.rate - first.rate) / first.rate) * 100
      : null;

  return (
    <section className="exchange-chart">
      <div className="chart-top">
        <div>
          <span className="chart-eyebrow">
            ANÁLISE DE MERCADO
          </span>

          <h2>Evolução da cotação</h2>

          <p>
            Histórico de {fromCurrency} para {toCurrency}
          </p>
        </div>

        <div
          className="period-buttons"
          aria-label="Período do gráfico"
        >
          {periods.map((period) => (
            <button
              key={period.value}
              type="button"
              className={
                days === period.value
                  ? "period-button active"
                  : "period-button"
              }
              onClick={() => onDaysChange(period.value)}
              aria-pressed={days === period.value}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {sameCurrency ? (
        <div className="chart-message">
          Escolha moedas diferentes para visualizar
          a evolução da cotação.
        </div>
      ) : loading ? (
        <div className="chart-message" role="status">
          Carregando histórico de cotações...
        </div>
      ) : error ? (
        <div
          className="chart-message chart-error"
          role="alert"
        >
          {error}
        </div>
      ) : history.length === 0 ? (
        <div className="chart-message">
          Nenhum dado histórico encontrado para
          o período selecionado.
        </div>
      ) : (
        <>
          <div
            className="chart-container"
            role="img"
            aria-label={
              `Gráfico com ${history.length} cotações ` +
              `de ${fromCurrency} para ${toCurrency}`
            }
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 12,
                  right: 15,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  stroke="#344755"
                  strokeDasharray="4 5"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  stroke="#A8B9C5"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  minTickGap={25}
                />

                <YAxis
                  stroke="#A8B9C5"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={65}
                  domain={["auto", "auto"]}
                  tickFormatter={formatRate}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#293A49",
                    border: "1px solid #405363",
                    borderRadius: "10px",
                    color: "#E6EDF0",
                  }}
                  labelStyle={{
                    color: "#E6EDF0",
                  }}
                  formatter={(value) => [
                    formatRate(value),
                    `${fromCurrency}/${toCurrency}`,
                  ]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.date ?? label
                  }
                />

                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#80BBAF"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#A3D5CA",
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-stats">
            <div className="chart-stat">
              <span>Última cotação do período</span>
              <strong>{formatRate(last.rate)}</strong>
            </div>

            <div className="chart-stat">
              <span>Variação no período</span>

              <strong
                className={
                  variation > 0
                    ? "positive"
                    : variation < 0
                      ? "negative"
                      : ""
                }
              >
                {variation === null
                  ? "—"
                  : `${
                      variation > 0 ? "+" : ""
                    }${variation.toFixed(2)}%`}
              </strong>
            </div>
          </div>

          <p className="chart-footnote">
            {history.length} registros disponíveis.
            Última referência: {last.date}.
            As cotações são indicativas e podem
            não incluir dias sem publicação.
          </p>
        </>
      )}
    </section>
  );
}
