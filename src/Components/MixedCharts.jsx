import React from 'react'
import { Chart as ChartJs} from 'react-chartjs-2';
import {
  Chart, CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

//chartjs3
Chart.register(ArcElement, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

//mixed chart label
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//mixed chart data
const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: Array.from({length: 7}, () => Math.floor(Math.random() * 140))
    },
    {
      type: 'line',
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: Array.from({length: 7}, () => Math.floor(Math.random() * 40)),
      borderColor: 'black',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: Array.from({length: 7}, () => Math.floor(Math.random() * 340)),
    },
  ],
};


const data2 = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 140))
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 140)),
        borderColor: 'black',
        borderWidth: 2,
      },
      {
        type: 'line',
        label: 'Dataset 3',
        backgroundColor: "blue",
        borderColor: 'blue',
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 540)),
      },
    ],
  };

const options = {
    plugins:{
        legend:{
            display:false
        }
    }, 
}



const MixedCharts = () => {
  return (
     <div className='row'>
         <div className="col-lg-6">
                <ChartJs data={data} options={options}/>
         </div>
         <div className="col-lg-6">
                <ChartJs data={data2} options={options}/>
         </div>
         
     </div>
  )
}

export default MixedCharts