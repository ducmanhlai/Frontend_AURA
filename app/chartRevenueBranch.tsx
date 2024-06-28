"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import {  ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = () => {
  
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    axios.get(`${config.host}/api/admin/get_revenue_branch`)
      .then((res) => {
        const revenueData = res.data;
        const labels = ['Tổng']
        const totalRevenue =[0]
        const totalCongno = [0]
        revenueData.forEach((element: any) => {
          labels.push(element.name)
          totalRevenue[0]+= parseInt(element.sum, 10)
          totalRevenue.push(parseInt(element.sum, 10))
          totalCongno[0]+= parseInt(element.total, 10) - parseInt(element.sum, 10)
          totalCongno.push(parseInt(element.total, 10) - parseInt(element.sum, 10))
        });   
        const data = {
          labels,
          datasets: [
            {
              label: 'Thực thu' as const,
              data: totalRevenue,
              backgroundColor: 'blue', 
              borderColor: 'rgba(54, 162, 235, 1)', // Blue
              borderWidth: 1,
            },
            {
              label: 'Công nợ'as const ,
              data: totalCongno,
              backgroundColor: 'red', 
              borderColor: 'red',
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
      });
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Doanh thu theo chi nhánh',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        // title: {
        //   display: true,
        //   text: 'Triệu đồng',
        // },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '700px', paddingTop:20 }} className="bg-white rounded shadow px-4">
      <h1 className="mb-4">Doanh thu theo chi nhánh</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
