
export default function CurrencyInput({
  label,
  value,
  onChange,
  currencies,
  id,
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <select
        id={id}
        className="currency-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} — {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
