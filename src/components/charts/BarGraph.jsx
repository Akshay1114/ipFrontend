import React from 'react'
import ReactApexChart from 'react-apexcharts';

function BarGraph(props) {
    const [state, setState] = React.useState({
          
        series: [{
          name: '',
          data: [12,21,47,20]
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          
          // xaxis: {
          //   categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          //   position: 'top',
          //   axisBorder: {
          //     show: false
          //   },
          //   axisTicks: {
          //     show: false
          //   },
          //   crosshairs: {
          //     fill: {
          //       type: 'gradient',
          //       gradient: {
          //         colorFrom: '#D8E3F0',
          //         colorTo: '#BED1E6',
          //         stops: [0, 100],
          //         opacityFrom: 0.4,
          //         opacityTo: 0.5,
          //       }
          //     }
          //   },
          //   tooltip: {
          //     enabled: false,
          //   }
          // },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              }
            }
          
          },
          title: {
            text: props?.title,
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444'
            }
          }
        },
      
      
    });

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}

export default BarGraph
