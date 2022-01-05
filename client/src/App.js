import './App.css';
import { useEffect, useState } from 'react';

const stocksUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=TSLA'

async function getStocks() {
  const response = await fetch(stocksUrl)
  return response.json()
}

function App() {
  const [price, setPrice] = useState(-1) 
  
  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      const data = await getStocks()
      const tesla = data.quoteResponse.result[0]
      setPrice(tesla.regularMarketPrice.toFixed(2))
      timeoutId = setTimeout(getLatestPrice, 5000)
    }

    timeoutId = setTimeout(getLatestPrice, 5000)
    return () => {
      clearTimeout(timeoutId)
    }
    

  }, [])

  return (
    <div className="price">
      {price}
    </div>
  );
}

export default App;
