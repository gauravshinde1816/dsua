import React from 'react'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
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
import { useParams } from 'react-router-dom'
import { data, labels, options } from '../data'

//chartjs3
Chart.register(ArcElement, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const FileItem = () => {
    let params = useParams()
    const fileitem = data.find((file) => file.id === parseInt(params.id))
    let graphdata = {
        labels: labels,
        datasets: [{
            label: fileitem.name,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            data: fileitem.chartdata,
        }],
    }

    return (
        <div className='container-fluid'>
            <div className="card p-2 mt-4">
                <div className='text-light p-3 bg-dark text-center font-weight-bold'>
                    {fileitem.name}
                </div>
                <div className='row my-4'>
                    <div className="col-lg-6 mt-4">
                        <Doughnut data={graphdata} options={options} />
                    </div>
                    <div className="col-lg-6 mt-4">
                        <Pie data={graphdata} options={options} />
                    </div>
                </div>
                <div className='row my-4'>
                    <div className="col-lg-6 mt-4">
                        <Bar data={graphdata} options={options} />
                    </div>
                    <div className="col-lg-6 mt-4">
                        <Line data={graphdata} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileItem