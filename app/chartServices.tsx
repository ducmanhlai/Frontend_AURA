"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import config from './config';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Top Services',
        data: [],
        backgroundColor: [
          '#182cdc',
          '#3547e9',
          '#5a68ed',
          '#7e8af1',
          '#a3abf5',
          '#c8cdf9',
        ],
        borderColor: [
          '#182cdc',
          '#3547e9',
          '#5a68ed',
          '#7e8af1',
          '#a3abf5',
          '#c8cdf9',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await axios.get(`${config.host}/api/admin/get_top_services`)).data;
        const totalBookings = (await axios.get(`${config.host}/api/admin/get_total_bookings`)).data
        // Calculate total quantity
        let extant = 100;
        // Format data into chart format with percentages
        const labels = data.map((item: { name: any; }) => item.name);
        labels.push('Khác')
        const percentages = data.map((item: { quantity: number; }) => {
          extant = extant > 0 ? extant - parseFloat(((item.quantity / totalBookings) * 100).toFixed(2)) : 0;
          return ((item.quantity / totalBookings) * 100).toFixed(2)
        });
        percentages.push(extant.toFixed(2))
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [{
            ...chartData.datasets[0],
            data: percentages,
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  const options = {
    plugins: {
      legend: {
        title: {
          display: true,
           text: 'Top 5 dịch vụ', 
           font: {
                  size: 14,
                  weight: 'bold' as const
           },
           padding: 10,
           color: 'black'
        },
        position: "right" as const,
        labels: {
          color: '#333',
          generateLabels: (chart: { data: any; }) => {
            const { data } = chart;
            return data.labels.map((label: any, i: string | number) => ({
              text: `${label}: ${data.datasets[0].data[i]}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].borderColor[i],
              lineWidth: data.datasets[0].borderWidth,
            }))
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '450px' }} className='bg-white'>
      <h1>Doanh thu theo dịch vụ</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Pie data={chartData} options={options} style={{maxHeight:'200px',maxWidth:400}}/>
      </div>
    </div>

  );
};

export default PieChart;
