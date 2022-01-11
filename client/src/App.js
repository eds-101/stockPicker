import './App.css';
import { useEffect, useState } from 'react';

const randomNumber = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"

function App() {
  const [stockPrice, setStockPrice] = useState(1) 


  useEffect( () => {
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
    const latestStockPrice = fetchStockPrice()
    setStockPrice(latestStockPrice)

  }, [])
    

  return (
    <div>
    </div>
  );
}

export default App;
