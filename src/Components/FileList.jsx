import React, { useEffect, useState } from 'react'
import { Line, Bar, Scatter, Pie  , Chart as ChartJs} from 'react-chartjs-2';
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
import { csvdata_1, csvdata_2, csvdata_3 , options, labels, backgroundColor, borderColor } from '../data'
//chartjs3
Chart.register(ArcElement, BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

//mixed chart label
const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//mixed chart data
const mixedchartdata = {
  labels2,
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [400,200,30,58,95,69,36]
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [450,200,300,95,69,360],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: [450,200,310,95,60,360],
    },
  ],
};






const FileList = () => {

  const [headers, setHeaders] = useState(null)
  const [items, setItems] = useState(null);
  const [activegraph, setactivegraph] = useState("")
  const [xaxis, setxaxis] = useState("")
  const [yaxis, setyaxis] = useState("")


  //graph Util
  const graphUtil = (header) => {
    let data = [];
    if (items && headers) {
      items.map((o) => {
        data.push(o[header]);
      });
    }
    return data;
  };




  //scatter plot
  const scatterPlot = (x, y) => {
    let data = [];
    if (items && headers) {
      items.map((o) => {
        data.push({ x: o[x], y: o[y] });
      });
    }
    return data;
  };



  useEffect(() => {
    setxaxis("")
    setyaxis("")
  }, [items])

  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className="col-lg-2 col-sm-4 col-xs-6 bg-dark border">
          <div className="col-header  font-weight-bold p-3 text-center text-light">
            Files
          </div>
        </div>
        <div className="col-lg-10 col-sm-8 col-xs-6 bg-dark border">
          <div className="col-header  font-weight-bold p-3 text-center text-light">
            {activegraph}
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-lg-2 col-sm-4 col-xs-6  border">
          <div className="row">
            <button className={`btn btn-${activegraph === "File 1" ? "warning" : "primary"} btn-block m-3`} onClick={() => {
              setactivegraph("File 1")
              setItems(csvdata_1)
              setHeaders(Object.keys(csvdata_1[0]));
              console.log(items, headers)
            }}>File 1</button>
          </div>
          <div className="row">
            <button className={`btn btn-${activegraph === "File 2" ? "warning" : "primary"} btn-block m-3`} onClick={() => {
              setactivegraph("File 2")
              setItems(csvdata_2)
              setHeaders(Object.keys(csvdata_2[0]));
              console.log(items, headers)
            }}>File 2</button>
          </div>

          <div className="row">
            <button className={`btn btn-${activegraph === "File 3" ? "warning" : "primary"} btn-block m-3`} onClick={() => {
              setactivegraph("File 3")
              setItems(csvdata_3)
              setHeaders(Object.keys(csvdata_3[0]));
              console.log(items, headers)
            }}>File 3</button>
          </div>
        </div>
        {activegraph === "" ? <div className='text-center'>
          <h1>Choose the File</h1>
        </div> : <div className="col-lg-10 col-sm-8 col-xs-6 bg-light border my-5">

          {/* Axis Information  */}
          <div className="card my-5 p-2">
            <form className="form-group">
              <div className="d-flex justify-content-around">
                <div>
                  <label for="selectXaxes">X-axis</label>
                  <select name="x" className="form-control" value={xaxis} onChange={(e) => setxaxis(e.target.value)}>
                    {headers && headers.map((h) => {
                      return <option>{h}</option>
                    })}

                  </select>
                </div>
                <div>
                  <label for="selectYaxes">Y-axis</label>
                  <select name="y" className="form-control" value={yaxis} onChange={(e) => setyaxis(e.target.value)}>
                    {headers && headers.map((h) => {
                      return <option>{h}</option>
                    })}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Charts */}
          <div className="row">
            <div className="col-lg-6">
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: `${xaxis} v/s ${yaxis}`,
                      backgroundColor: "rgb(255, 99, 132)",
                      borderColor: "rgba(255, 159, 64, 0.2)",
                      data: scatterPlot(xaxis, yaxis),
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      type: "linear",
                    },
                  },
                }}
              />
            </div>
            <div className="col-lg-6">
              <Scatter
                data={{
                  datasets: [
                    {
                      label: `${xaxis} v/s ${yaxis}`,
                      backgroundColor: "rgb(255, 99, 132)",
                      data: scatterPlot(xaxis, yaxis),
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      type: "linear",
                      position: "bottom",
                      // min: 280,
                      // max: 350,
                      title: {
                        display: true,
                        text: `${xaxis}`,
                      },
                    },

                    y: {
                      type: "linear",
                      title: {
                        display: true,
                        text: `${yaxis}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Bar
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: yaxis,
                      backgroundColor,
                      borderColor,
                      data: graphUtil(yaxis),
                    },
                  ],
                }}
                options={options}
              />
            </div>
            <div className="col-lg-6">
              <Pie
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: yaxis,
                      backgroundColor,
                      borderColor,
                      data: graphUtil(yaxis),
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
          
        </div>}

      </div>
      {/*  {
        data  &&  data.map(file => (
          <div className='row' key={file.name}>
            <div className="col-lg-2 col-sm-4 col-xs-6 border bg-light">
              <div className=" p-3 text-center">
                <p>{file.name}</p>
                <Link key={file.id} to={`/files/${file.name}`}>{file.name}</Link>
              </div>
            </div>
            <div className="col-lg-10 col-sm-8 col-xs-6 border bg-light">
              <div className="p-3 text-center">
                <div className='row'>
                  <div className="col-lg-6">
                    <Bar data={{
                      labels: labels,
                      datasets: [{
                        label: file.name,
                        backgroundColor,
                        borderColor,
                        data: file.chartdata,
                      }],
                    }} options={options} />
                  </div>
                   <div className="col-lg-6">
                    <Line data={{
                      labels: labels,
                      datasets: [{
                        label: file.name,
                        backgroundColor,
                        borderColor,
                        data: file.chartdata,
                      }],
                    }} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      } */}
    </div>
  )
}

export default FileList