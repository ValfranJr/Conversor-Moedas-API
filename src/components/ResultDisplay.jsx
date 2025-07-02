
function ResultDisplay({ fromCurrency, toCurrency, amount, result }) {
  return (
    <div className="mt-6 text-2xl font-bold text-blue-600">
      <h3 >
        {amount} {fromCurrency} é igual a
      </h3>
      <h2>
        {result} {toCurrency}
      </h2>
    </div>
  );
}

export default ResultDisplay;
