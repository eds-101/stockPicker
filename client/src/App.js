import './App.css';
import { useEffect, useState } from 'react';

const randomNumber = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"

async function fetchStockPrice() {
  try {
    const res = await fetch(randomNumber)
    const result = await res.json()
    console.log(result[0])
    return result[0]
  } catch (e) {
    console.error(e)
  }
}

function App() {
  const [stockPrice, setStockPrice] = useState(1) 

useEffect( () => {
  const timeoutId = setInterval(async () => {
    console.log('initial price ', stockPrice)
    const latestStockPrice = await fetchStockPrice()
    setStockPrice(latestStockPrice)

  }, 5000)

  return () => clearInterval(timeoutId)



}, [])
    
  return (
    <div>
      {'$' + stockPrice}
    </div>
  );
}

export default App;
