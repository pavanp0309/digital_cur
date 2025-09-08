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
} from "chart.js";

Chart.register(
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip
);

const LineCharts = ({ data }) => {
  if (!data || data.length === 0) return <p>No data</p>;

  const firstPrice = parseFloat(data[0].price);
  const lastPrice = parseFloat(data[data.length - 1].price);

  const trendColor =
    lastPrice > firstPrice ? "green" : lastPrice < firstPrice ? "red" : "orange";

  const chartdata = {
    labels: data.map((ele) =>
      new Date(ele.timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ),
    datasets: [
      {
        label: "Price",
        data: data.map((ele) => parseFloat(ele.price)),
        borderColor: trendColor,
        backgroundColor: trendColor,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div style={{ width: "100px", height: "30px" }}>
      <Line data={chartdata} options={options} />
    </div>
  );
};

export default LineCharts;
