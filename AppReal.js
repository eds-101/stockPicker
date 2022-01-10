import './App.css';
import { useEffect, useState } from 'react';

const stocksUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=TSLA'

async function getStocks() {
  // Needs CORS approval when running on localhost
  // Used Moesif CORS Google Chrome extension to bypass this
  const response = await fetch(stocksUrl)
  return response.json()
}

function App() {
  const [price, setPrice] = useState(-1) 
  const [prevPrice, setPrevPrice] = useState(0)
  const [priceTime, setPriceTime] = useState(null)
  
  useEffect(() => {
    const timeoutId = setInterval(async () => {
      setPrevPrice(price)
      console.log('initial price ', price)
      const data = await getStocks()
      let teslaPrice = data.quoteResponse.result[0].regularMarketPrice.toFixed(2)
      let teslaTime = new Date(data.quoteResponse.result[0].regularMarketTime * 1000)

      setPrice(teslaPrice)
      setPriceTime(teslaTime) 
      return {teslaPrice, teslaTime, price}
    }, 5000)

    // async function updateData() {
    //   setPrice(timeoutId.teslaPrice)
    //   setPriceTime(timeoutId.teslaTime)
    //   console.log('new initial price ', price)
    // }
    
    return () => clearInterval(timeoutId)
  }, [price])

  return (
    <div>
      <div className={['price', prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''].join(" ")}>
        {'$' + price}
      </div>
      <div className="price-time">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default App;
