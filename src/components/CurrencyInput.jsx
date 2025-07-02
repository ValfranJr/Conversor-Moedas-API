import React from 'react';

function CurrencyInput({ label, amount, currency, onAmountChange, onCurrencyChange, currencies }) {
  return (
    <div className="currency-input">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
      <input className="border rounded px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
      required/>
      <select className="ml-2 px-2 py-2 border rounded bg-white shadow-sm" value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
