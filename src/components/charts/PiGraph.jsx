import React from 'react'
import ReactApexChart from 'react-apexcharts';

function PiGraph() {
    const [state, setState] = React.useState({
          
        series: [44, 55, 13, 33],
        options: {
          chart: {
            width: 380,
            type: 'donut',
          },
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          }
        },
      
      
    });

    
    //   function appendData() {
    //   var arr = state.series.slice()
    //   arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    
    //   setState({
    //     ...state,
    //     series: arr
    //   })
    // }
    
    // function removeData() {
    //   if(state.series.length === 1) return
      
    //   var arr = state.series.slice()
    //   arr.pop()
    
    //   setState({
    //     ...state,
    //     series: arr
    //   })
    // }
    
    // function randomize() {
    //   setState({
    //     ...state,
    //     series: state.series.map(function() {
    //       return Math.floor(Math.random() * (100 - 1 + 1)) + 1
    //     })
    //   })
    // }
    
    // function reset() {
    //   setState({
    //     ...state,
    //     series: [44, 55, 13, 33]
    //   })
    // }
    

  return (
    <div>
    <div>
        <div class="chart-wrap">
          <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
      </div>
        </div>
      </div>
    <div id="html-dist"></div>
  </div>
  )
}

export default PiGraph
