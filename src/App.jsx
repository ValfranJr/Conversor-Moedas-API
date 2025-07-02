import { useState, useEffect } from 'react';
import CurrencyInput from './components/CurrencyInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('BRL');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
      });
  }, []);

  useEffect(() => {
    if (currency1 && currency2) {
      setIsLoading(true);
      fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[currency2]);
        })
        .catch(error => console.error('Error fetching exchange rate:', error))
        .finally(() => setIsLoading(false));
    }
  }, [currency1, currency2]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setAmount2((amount1 * exchangeRate).toFixed(2));
    }
  }, [amount1, exchangeRate]);

  function handleAmount1Change(amount1) {
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount2(amount2);
    if (exchangeRate !== null) {
      setAmount1((amount2 / exchangeRate).toFixed(2));
    }
  }

  function handleCurrency2Change(currency2) {
    setCurrency2(currency2);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6" >Conversor de Moedas</h1>
      {isLoading || !exchangeRate ? (
        <Loader />
      ) : (
        <>
          <CurrencyInput
            label="Selecione a moeda de origem"
            amount={amount1}
            currency={currency1}
            currencies={currencies}
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
          />
          <CurrencyInput
            label="Selecione a moeda de destino"
            amount={amount2}
            currency={currency2}
            currencies={currencies}
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
          />
          <div className="result-container">
            <div className="result-display-container">
              <ResultDisplay
                fromCurrency={currency1}
                toCurrency={currency2}
                amount={amount1}
                result={amount2}
              />
            </div>
            <div className="result-exchange-rate-container">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                1 {currency1} = {exchangeRate} {currency2}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;