import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Line, Bar, Scatter, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { options, labels, backgroundColor, borderColor } from "../data";

Chart.register(
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const ReadCSV = () => {
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState();
  const [title, setTitle] = useState("");
  const [xaxis, setxaxis] = useState("")
  const [yaxis, setyaxis] = useState("")
  //use effects
  useEffect(() => {
    setxaxis("")
    setyaxis("")
  }, [items])
  //read logic
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];
        //name of file
        // console.log(wsname)

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
      setHeaders(Object.keys(d[0]));
    });
  };

  const graphUtil = (header) => {
    let data = [];
    if (items && headers) {
      items.map((o) => {
        data.push(o[header]);
      });
    }
    return data;
  };

  const scatterPlot = (x, y) => {
    let data = [];
    if (items && headers) {
      items.map((o) => {
        data.push({ x: o[x], y: o[y] });
      });
    }
    return data;
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept=".csv"
          className="btn btn-primary"
          onChange={(e) => {
            const file = e.target.files[0];
            setTitle(file.name);
            readExcel(file);
          }}
        />
      </div>
      <h3>{title}</h3>

      {/* tabs */}
      <div className="container-fluid">
        <ul class="nav nav-pills nav-fill border">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home">
              Data
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#menu1">
              Charts
            </a>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <div id="home" class="container tab-pane active">
          <table className="table table-dark my-5">
            <thead>
              <tr>
                {headers &&
                  Object.entries(headers).map((h, i) => (
                    <th scope="col" key={i}>
                      {h[1]}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {items &&
                Object.entries(items).map((item, i) => {
                  //row
                  return (
                    <tr key={i}>
                      {Object.entries(item[1]).map((row, i) => {
                        //data
                        return <td key={i}>{row[1]}</td>;
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div id="menu1" class="container tab-pane fade">
          {items && headers ? (
            <div className="container-fluid mt-5">
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
            </div>
          ) : (
            <div>
              <h1 className="text-center">No Data to load the chart</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadCSV;
