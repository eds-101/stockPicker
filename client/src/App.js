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
    getStocks()
      .then((data) => {
        const tsla = data.quoteResponse.result[0]
        console.log(tsla)
        setPrice(tsla.regularMarketPrice)
      })
  }, [])

  return (
    <div className="price">
      {price}
    </div>
  );
}

export default App;
