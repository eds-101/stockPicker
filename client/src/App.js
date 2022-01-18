import './App.css';
import { useEffect, useState, useReducer } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const stocksUrl = 'https://yahoo-finance-api.vercel.app/tsla'

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

var data = [
  [1491226200000, 143.71, 144.12, 143.05, 143.7, 19985700],
  [1491312600000, 143.25, 144.89, 143.17, 144.77, 19891400],
  [1491399000000, 144.22, 145.46, 143.81, 144.02, 27717900],
  [1491485400000, 144.29, 144.52, 143.45, 143.66, 21149000],
  [1491571800000, 143.73, 144.18, 143.27, 143.34, 16672200],
  [1491831000000, 143.6, 143.88, 142.9, 143.17, 18933400]
]

var ohlc = [],
  volume = [],
  dataLength = data.length,
  groupingUnits = [
    [
      "week", // unit name
      [1] // allowed multiples
    ],
    ["month", [1, 2, 3, 4, 6]]
  ],
  i = 0;

for (i; i < dataLength; i += 1) {
  ohlc.push([
    data[i][0], // the date
    data[i][1], // open
    data[i][2], // high
    data[i][3], // low
    data[i][4] // close
  ]);

  volume.push([
    data[i][0], // the date
    data[i][5] // the volume
  ]);
}
const options = {
  rangeSelector: {
    selected: 1
  },

  title: {
    text: "TSLA Historical"
  },

  yAxis: [
    {
      labels: {
        align: "right",
        x: -3
      },
      title: {
        text: "Open Hi Low Close"
      },
      height: "60%",
      lineWidth: 2,
      resize: {
        enabled: true
      }
    },
    {
      labels: {
        align: "right",
        x: -3
      },
      title: {
        text: "Volume"
      },
      top: "65%",
      height: "35%",
      offset: 0,
      lineWidth: 2
    }
  ],

  series: [
    {
      type: "candlestick",
      name: "TESLA",
      data: ohlc,
      dataGrouping: {
        units: groupingUnits
      }
    },
    {
      type: "column",
      name: "Volume",
      data: volume,
      yAxis: 1,
      dataGrouping: {
        units: groupingUnits
      }
    }
  ]
};

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
      const latestStockPrice = stockData.chart.result[0].meta.regularMarketPrice
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
        {priceTime}
      </div>
      <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
      </div>
    </div>
  );
}

export default App;
