import './App.css';
import { useEffect, useState } from 'react';

const stocksUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=TSLA'

async function getStocks() {
  const response = await fetch(stocksUrl)
  return response.json()
}

function App() {
  const [price, setPrice] = useState(-1) 
  const [priceTime, setPriceTime] = useState(null)
  
  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      const data = await getStocks()
      const tesla = data.quoteResponse.result[0]
      setPrice('$' + tesla.regularMarketPrice.toFixed(2))
      setPriceTime(new Date(tesla.regularMarketTime * 1000)) 
      timeoutId = setTimeout(getLatestPrice, 5000)
    }
    
    timeoutId = setTimeout(getLatestPrice, 5000)
    return () => {
      // Stops updating if the component is unmounted by clearing the timer
      clearTimeout(timeoutId)
    }
    

  }, [])

  return (
    <div>
      <div className="price">
        {price}
      </div>
      <div className="price-time">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default App;
