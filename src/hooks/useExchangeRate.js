
import { useEffect, useState } from "react";

export default function useExchangeRate(
  fromCurrency,
  toCurrency
) {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      setQuote(null);
      setError("");

      if (fromCurrency === toCurrency) {
        setQuote({
          fromCurrency,
          toCurrency,
          rate: 1,
          date: null,
        });
        return;
      }

      try {
        const url =
          "https://api.frankfurter.dev/v2/rate/" +
          `${fromCurrency}/${toCurrency}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Não foi possível consultar a cotação."
          );
        }

        const data = await response.json();

        if (
          typeof data.rate !== "number" ||
          !Number.isFinite(data.rate) ||
          data.rate <= 0
        ) {
          throw new Error(
            "A API retornou uma cotação inválida."
          );
        }

        if (controller.signal.aborted) return;

        setQuote({
          fromCurrency,
          toCurrency,
          rate: data.rate,
          date: data.date,
        });
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro inesperado."
        );
      }
    }

    fetchRate();

    return () => {
      controller.abort();
    };
  }, [fromCurrency, toCurrency]);

  const quoteMatchesSelection =
    quote?.fromCurrency === fromCurrency &&
    quote?.toCurrency === toCurrency;

  const rate = quoteMatchesSelection
    ? quote.rate
    : null;

  const rateDate = quoteMatchesSelection
    ? quote.date
    : null;

  const loading =
    !quoteMatchesSelection && error === "";

  return {
    rate,
    rateDate,
    loading,
    error,
  };
}
