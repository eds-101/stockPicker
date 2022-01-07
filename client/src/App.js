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
  const [priceTime, setPriceTime] = useState(null)
  const [prevPrice, setPrevPrice] = useState(-1)

  
  useEffect(() => {
    let timeoutId;
    
    async function getLatestPrice() {
      const price = await getStocks()
      return price.quoteResponse.result[0]
    }

    async function updateData() {
      const data = await getLatestPrice()

      setPriceTime(new Date(data.regularMarketTime * 1000)) 
      setPrevPrice(price)
      setPrice(data.regularMarketPrice.toFixed(2))
      console.log(prevPrice + ' , ' + price)
      timeoutId = setTimeout(getLatestPrice, 5000)
    }
    
    updateData()
    return () => {
      // Stops updating if the component is unmounted by clearing the timer
      clearTimeout(timeoutId)
    }
    

  }, [])

  return (
    <div>
      <div className={['price', prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''].join(" ")}>
      {/* <div className={['price', prevPrice < price ? 'up' : 'down'].join(" ")}> */}

        {price}
      </div>
      <div className="price-time">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default App;
