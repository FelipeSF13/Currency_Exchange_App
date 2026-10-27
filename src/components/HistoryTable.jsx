
import { useMemo, useState } from "react";
import "./HistoryTable.css";

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatRate(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export default function HistoryTable({
  history,
  fromCurrency,
  toCurrency,
  loading,
  error,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredHistory = useMemo(() => {
    const query = search.trim();

    const filtered = history.filter((item) => {
      const brazilianDate = formatDate(item.date);

      return (
        brazilianDate.includes(query) ||
        item.date.includes(query)
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.date.localeCompare(b.date);

        case "highest":
          return b.rate - a.rate;

        case "lowest":
          return a.rate - b.rate;

        case "recent":
        default:
          return b.date.localeCompare(a.date);
      }
    });
  }, [history, search, sortBy]);

  return (
    <section className="history-table-card">
      <div className="history-heading">
        <div>
          <span className="history-eyebrow">
            DADOS HISTÓRICOS
          </span>

          <h2>Histórico de cotações</h2>

          <p>
            Consulte os registros de {fromCurrency} para{" "}
            {toCurrency}.
          </p>
        </div>

        <span className="history-counter">
          {filteredHistory.length} registros
        </span>
      </div>

      <div className="history-filters">
        <div className="history-field">
          <label htmlFor="history-search">
            Pesquisar por data
          </label>

          <input
            id="history-search"
            type="search"
            placeholder="Ex.: 27/10 ou 2026-10"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="history-field">
          <label htmlFor="history-sort">
            Ordenar por
          </label>

          <select
            id="history-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="recent">
              Data: mais recentes
            </option>

            <option value="oldest">
              Data: mais antigas
            </option>

            <option value="highest">
              Cotação: maior valor
            </option>

            <option value="lowest">
              Cotação: menor valor
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="history-feedback" role="status">
          Carregando histórico...
        </p>
      ) : error ? (
        <p
          className="history-feedback history-error"
          role="alert"
        >
          {error}
        </p>
      ) : filteredHistory.length === 0 ? (
        <p className="history-feedback">
          Nenhum registro encontrado.
        </p>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">
                  Cotação ({fromCurrency}/{toCurrency})
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredHistory.map((item) => (
                <tr key={item.date}>
                  <td>{formatDate(item.date)}</td>

                  <td className="history-rate">
                    {formatRate(item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="history-description">
        Os dados correspondem ao período selecionado
        no gráfico. Dias sem publicação de cotação
        podem não aparecer.
      </p>
    </section>
  );
}
