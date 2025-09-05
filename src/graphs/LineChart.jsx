import React from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Legend,
  Tooltip,
  scales,
} from "chart.js";

Chart.register([
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
]);

const LineCharts = ({ data }) => {
  console.log("chart", data);

  const firstPrice = parseFloat(data[0].price);
  const lastPrice = parseFloat(data[data.length - 1].price);
  const trendColor =
    lastPrice > firstPrice
      ? "green"
      : lastPrice < firstPrice
      ? "red"
      : "orange";

  const chartdata = {
    labels: data.map((ele) =>
      new Date(ele.timestamp * 1000).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "price",
        data: data.map((ele) => parseFloat(ele.price)),
        fill: false,
        borderColor: trendColor,
        backgroundColor: trendColor,
        tension: 0.4,
        borderWidth: 2,
        pointRadius:0
      },
    ],
  };

const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "20px" }}>
      <Line data={chartdata} options={options} />
    </div>
  );
};

export default LineCharts;
