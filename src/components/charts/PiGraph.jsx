import React from 'react';
import ReactApexChart from 'react-apexcharts';

function PiGraph() {
  const [state, setState] = React.useState({
    series: [65, 35],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#00A56B', '#2C2C2C'], // Customize the colors here
      labels: [], // Customize the legend names here
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
        show: false, // Hide the legend
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    },
  });

  return (
    <div>
      <div className="chart-wrap">
        <div id="chart">
          <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default PiGraph;
