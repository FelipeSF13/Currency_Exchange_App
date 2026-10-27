
function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function escapeCsv(value) {
  const text = String(value);

  if (/[;"\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export default function exportCsv(
  data,
  fromCurrency,
  toCurrency
) {
  if (!data || data.length === 0) {
    return false;
  }

  const headers = [
    "Data",
    "Moeda de origem",
    "Moeda de destino",
    "Cotacao",
  ];

  const rows = data.map((item) => [
    formatDate(item.date),
    fromCurrency,
    toCurrency,
    item.rate.toString().replace(".", ","),
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.map(escapeCsv).join(";")
    )
    .join("\r\n");

  const bom = "\uFEFF";

  const blob = new Blob(
    [bom + "sep=;\r\n" + csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download =
    `cotacoes_${fromCurrency}_${toCurrency}_${date}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);

  return true;
}
