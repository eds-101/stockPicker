import './App.css';
import { useEffect, useState, useReducer } from 'react';

const randomNumber = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"

async function fetchStockPrice() {
  // Needs CORS approval when running on localhost
  // Used Moesif CORS Google Chrome extension to bypass this
  try {
    const res = await fetch(randomNumber)
    const result = await res.json()
    console.log(result[0])
    return result[0]
  } catch(e) {
    console.error(e)
  }
}

function App() {
  const [stockPrice, setStockPrice] = useState({
    latest: 1,
    previous: 0,
    history: []
  })
  const [priceTime, setPriceTime] = useState(null)

  useEffect(() => {
    let timeoutId;
    async function updateTime() {
      setPriceTime(new Date().toString())
      timeoutId = setTimeout(updateTime, 5000)
    }
    updateTime()
    return () => {
      clearTimeout(timeoutId)
    }
  }, )

  useEffect(() => {  
    async function updateStockPrice() {  
      const latestStockPrice = await fetchStockPrice()
      setStockPrice(oldPrices => { 
        return {
        latest: latestStockPrice, 
        previous: oldPrices.latest, 
        history: [...oldPrices.history, latestStockPrice]
        }}
      )
    }
    updateStockPrice()
  }, [priceTime])
    
  return (
    <div>
      <div className={['price', 
                      stockPrice.previous < stockPrice.latest ?'greenText' 
                      : stockPrice.previous > stockPrice.latest ? 'redText' 
                      : ''].join(" ")}>
        {'Current price: $' + stockPrice.latest} <br/>
        {priceTime}
      </div>
    </div>
  );
}

export default App;
