import React from 'react'
import ReactApexCharts from 'react-apexcharts'

// All order
export const OrderChart = () => {
    const series = [{
        name: 'Order',
        data: [10, 31, 40, 28, 51, 42, 109, 100, 90, 95, 205, 80]
    }]

    const options = {
        chart: {
            height: 450,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'month',
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yaxis: {
            opposite: true
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        title: {
            text: 'Order Summary',
            align: 'left'
        },
        subtitle: {
            text: 'Order Summary of the Month',
            align: 'left'
        },
        legend: {
            horizontalAlign: 'left'
        }
    }

    return (
        <div>
            <ReactApexCharts options={options} series={series} type="area" height={450} />
        </div>
    );
};


// Order Status 
export const OrderStatusChart = () => {
    const series = [100, 100, 100, 105, 100, 90]

    const options = {
        chart: {
            width: 550,
            type: 'polarArea'
        },
        labels: ['Created', 'Pending', 'Approved', 'Cancled', 'Paid', 'Non-Paid'],
        title: {
            text: 'Order Status',
            align: 'center'
        },
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: false
        },
        legend: {
            position: 'right'
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    return (
        <div>
            <ReactApexCharts options={options} series={series} type="polarArea" width={350} />
        </div>
    );
};