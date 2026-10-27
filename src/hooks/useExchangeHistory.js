
import { useEffect, useState } from "react";

function getDateRange(days) {
  const end = new Date();
  const start = new Date();

  start.setUTCDate(end.getUTCDate() - days);

  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
  };
}

export default function useExchangeHistory(
  fromCurrency,
  toCurrency,
  days
) {
  const key = `${fromCurrency}-${toCurrency}-${days}`;

  const [request, setRequest] = useState({
    key: null,
    data: [],
    error: "",
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHistory() {
      if (fromCurrency === toCurrency) {
        setRequest({
          key,
          data: [],
          error: "",
          loading: false,
        });
        return;
      }

      setRequest({
        key,
        data: [],
        error: "",
        loading: true,
      });

      try {
        const { from, to } = getDateRange(days);

        const params = new URLSearchParams({
          from,
          to,
          base: fromCurrency,
          quotes: toCurrency,
        });

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível consultar o histórico."
          );
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error(
            "Formato de histórico não reconhecido."
          );
        }

        const history = result
          .filter(
            (item) =>
              item.base === fromCurrency &&
              item.quote === toCurrency &&
              typeof item.rate === "number" &&
              Number.isFinite(item.rate) &&
              item.rate > 0
          )
          .map((item) => ({
            date: item.date,
            rate: item.rate,
          }))
          .sort((a, b) =>
            a.date.localeCompare(b.date)
          );

        if (controller.signal.aborted) return;

        setRequest({
          key,
          data: history,
          error: "",
          loading: false,
        });
      } catch (err) {
        if (controller.signal.aborted) return;

        setRequest({
          key,
          data: [],
          error:
            err instanceof Error
              ? err.message
              : "Erro inesperado ao buscar histórico.",
          loading: false,
        });
      }
    }

    fetchHistory();

    return () => controller.abort();
  }, [fromCurrency, toCurrency, days, key]);

  const current = request.key === key;

  return {
    history: current ? request.data : [],
    loading: !current || request.loading,
    error: current ? request.error : "",
  };
}
