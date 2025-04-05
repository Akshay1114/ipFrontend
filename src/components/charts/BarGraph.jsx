import React from 'react';
import ReactApexChart from 'react-apexcharts';

function BarGraph(props) {
    // Simplified state for example data
    const series = [{
        name: '', // Set name if needed for tooltip/legend
        data: [12, 21, 47, 20] // Example data
    }];

    const options = {
        chart: {
            type: 'bar',
            // REMOVED height: 350
            toolbar: { show: false }, // Hide toolbar for cleaner look
            background: 'transparent', // Ensure chart background is transparent
        },
        plotOptions: {
            bar: {
                borderRadius: 6, // Slightly smaller radius
                horizontal: false, // Ensure it's a vertical bar chart
                dataLabels: {
                    position: 'top', // Keep labels on top
                },
                 columnWidth: '60%', // Adjust column width if needed
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val; // Display raw value or format as needed (e.g., val + "%")
            },
            offsetY: -15, // Adjust label position
            style: {
                fontSize: '10px', // Smaller font size
                colors: ["#555"]
            }
        },
        xaxis: {
            // Assuming no categories needed for this simple sleep bar chart
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example categories if needed
            labels: { show: false }, // Hide x-axis labels
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { show: false }, // Hide y-axis labels
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        grid: {
            show: false, // Hide grid lines
        },
        tooltip: {
            enabled: true, // Enable tooltip on hover if desired
        },
        title: {
            text: props?.title, // Keep title if passed, but ensure it's not too large
            align: 'center',
            style: {
                fontSize: '12px', // Smaller title font
                color: '#444'
            },
            offsetY: 5, // Adjust title position if needed
            floating: false, // Avoid floating title which can interfere with layout
        },
        // Ensure responsive options if available explicitly (though usually default)
        responsive: [{
          breakpoint: 480, // Example breakpoint
          options: {
            dataLabels: { style: { fontSize: '9px' } },
            plotOptions: { bar: { columnWidth: '80%' } }
          }
        }]
    };

    // Wrap in a div to help with sizing controlled by parent CSS
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="100%" /* Make chart fill container height */
                width="100%"  /* Make chart fill container width */
            />
        </div>
    );
}

export default BarGraph;