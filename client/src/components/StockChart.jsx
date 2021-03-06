import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
  title: {
    text: 'My stock chart'
  },
  series: [{
    data: [8, 2, 3]
  }]
}

const StockChart = (props) => <HighchartsReact
  highcharts={Highcharts}
  constructorType={'stockChart'}
  options={options, series[data]={props.data}}
/>

export default StockChart