import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

// const stocksUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=TSLA'

// async function getStocks() {
//   const response = await fetch(stocksUrl)
//   return response.json()
// }

const ranNumURL = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"

function App() {
  const [price, setPrice] = useState(100)
  const [prevPrice, setPrevPrice] = useState(0)
  const [priceTime, setPriceTime] = useState(null)

  useEffect(() => {
    let timeoutId;

    // setPrevPrice(price)
    async function getLatestPrice() {

      setPriceTime(new Date().toString())
      timeoutId = setTimeout(getLatestPrice, 2000)
    }
    getLatestPrice()
    return () => {
      // Stops updating if the component is unmounted by clearing the timer
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    setPrevPrice(price)
    axios.get(ranNumURL).then(res => {
      console.log(res.data[0]);
      setPrice(res.data[0])
    }).catch(err => console.log(err))
  }, [priceTime])

  return (

    <div>
      <div className={['price', prevPrice < price ? 'up' : prevPrice > price ? 'down' : ''].join(" ")}>
        {price}
      </div>
      <div className="price-time">
        {priceTime && priceTime}
      </div>
    </div>
  );
}

export default App;