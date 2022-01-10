import './App.css';
import { useEffect, useState } from 'react';

const randomNumber = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1"

function App() {
  
  useEffect( () => {
    async function fetchData() {
      try {
        const res = await fetch(randomNumber)
        const result = await res.json()
        console.log(result)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
    

  return (
    <div>

    </div>
  );
}

export default App;
