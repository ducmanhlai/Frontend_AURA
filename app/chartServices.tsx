"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { CoreChartOptions, ElementChartOptions, Legend, plugins } from 'chart.js/auto';
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'GeeksforGeeks Bar Chart',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: 'right', // Places the legend on the right side
        labels: {
          color: '#333', // Customize legend text color (use 'color' instead of 'fontColor' for Chart.js 3.x+)
          generateLabels: (chart: { data: any; }) => {
            const { data } = chart;
            return data.labels.map((label: any, i: string | number) => ({
              text: `${label}: ${data.datasets[0].data[i]}`, // Combine label and data
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].borderColor[i],
              lineWidth: data.datasets[0].borderWidth,
            }));
          },
        },
      },
    },
  };
  const PieChart = () => {
    return (
      <div style={{ width: '100%', height: '300px' }} className='bg-white'>
        <h1>Doanh thu theo chi nhánh</h1>
        <Pie data={data} options={options}/>
      </div>
    );
  };
  export default PieChart;
  