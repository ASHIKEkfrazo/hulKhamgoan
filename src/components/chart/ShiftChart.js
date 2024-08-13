import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const transformData = (dataArray) => {
                const result = [];
                const shiftNames = Object.keys(dataArray[0][Object.keys(dataArray[0])[0]]);
                const shiftData = {};

                // Process each object in the input array
                dataArray.forEach(data => {
                    Object.keys(data).forEach(date => {
                        shiftNames.forEach(shift => {
                            if (!shiftData[shift]) {
                                shiftData[shift] = {
                                    major: [],
                                    minor: []
                                };
                            }

                            // Push major and minor values to respective arrays, formatting to 1 decimal place
                            shiftData[shift].major.push(parseFloat(data[date][shift].major.toFixed(1)));
                            shiftData[shift].minor.push(parseFloat(data[date][shift].minor.toFixed(1)));
                        });
                    });
                });

                shiftNames.forEach(shift => {
                    result.push({
                        name: `${shift} Major`,
                        group: shift,
                        data: shiftData[shift].major.map(val => parseFloat(val).toFixed(1))
                    });
                    result.push({
                        name: `${shift} Minor`,
                        group: shift,
                        data: shiftData[shift].minor.map((val) => parseFloat(val).toFixed(1))
                    });
                });

                return result;
            };

            // Transform the input data array and update state
            const transformedData = transformData(data);
            setChartData(transformedData);

            // Set the categories based on dates in the data
            setCategories(Object.keys(data[0]));
        }

    }, [data]);

    const [options] = useState({
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        dataLabels: {

        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        xaxis: {
            categories: categories
        },
        fill: {
            opacity: 1
        },
        colors: ['#FF5733', '#FF8D1A'], // Add your desired colors here     
        yaxis: {
            labels: {

            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    });


    return (

        <div>
            {
                data.length > 0 ?
                    <div id="chart">

                        <ReactApexChart options={options} series={chartData} type="bar" height={350} />
                    </div>
                    :
                    <div className="" style={{ textAlign: 'center', alignContent: 'center', fontWeight: 700 }}>NO DATA</div>
            }
        </div>
    );
};

export default ApexChart;
