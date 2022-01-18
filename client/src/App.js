import './App.css';
import { useEffect, useState, useReducer } from 'react';

const stocksUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=TSLA'

async function fetchStockData() {
  // Needs CORS approval when running on localhost
  // Used Moesif CORS Google Chrome extension to bypass this
  try {
    const response = await fetch(stocksUrl)
    return response.json()
  } catch(e) {
    console.error(e)
  }
}

function App() {
  const [stockPrice, setStockPrice] = useState({
    latest: 1, previous: 0, history: []
  })
  const [priceTime, setPriceTime] = useState(null)

  useEffect(() => {
    let timeoutId;
    async function updateTime() {
      setPriceTime(new Date().toLocaleString())
      timeoutId = setTimeout(updateTime, 5000)
    }
    updateTime()
    return () => {
      clearTimeout(timeoutId)
    }
  }, )

  useEffect(() => {  
    async function updateStockData() {  
      const stockData = await fetchStockData()
      console.log(stockData)
      const latestStockPrice = stockData.quoteResponse.result[0].regularMarketPrice.toFixed(2)
      setStockPrice(oldPrices => { 
        return {
        latest: latestStockPrice, 
        previous: oldPrices.latest, 
        history: [...oldPrices.history, latestStockPrice]
        }}
      )
    }
    updateStockData()
  }, [priceTime])
    
  return (
    <div>
      <div className={['price', 
                      stockPrice.previous < stockPrice.latest ?'greenText' 
                      : stockPrice.previous > stockPrice.latest ? 'redText' 
                      : ''].join(" ")}>
        {'TSLA'} <br/>
        {'Current price: $' + stockPrice.latest} <br/>
        {/* {'History: ' + stockPrice.history} <br/> */}
        {priceTime}
      </div>
    </div>
  );
}

export default App;
