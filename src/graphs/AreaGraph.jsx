import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";
const cardinal = curveCardinal.tension(0.2);
import useCryptoHistory from "../hooks/useCryptoHistory";

const AreaGraph = ({ coins }) => {
  console.log("gcoins", coins);
  const { uuid: coinId, name, symbol, iconUrl } = coins;

  const { history, isLoading, isError } = useCryptoHistory(coinId);
  console.log(history);
  if (isLoading) {
    return <h6>loading...</h6>;
  }
  if (isError) {
    return <h6>error..</h6>;
  }
  let graphdata = history.map((point) => ({
    date: new Date(point.timestamp * 1000).toLocaleDateString(),
    price: point.price,
  }));

  return (
    <div className="col-sm-12 col-md-4 col-lg-4 col-12">
      <div
        className=" shadow border border-success p-3"
        
      >
        {/* card_header_section_start */}
        <h5 className="d-flex justify-content-between border-bottom">
          <img
            src={iconUrl}
            alt=""
            className="rounded-circle"
            width={"30px"}
            height={"30px"}
          />
          <span className=" mx-2">{name}</span>
          <span className="card-text">{symbol}</span>
        </h5>
        {/* card_header_section_end */}
        <div width={"100%"} height={"100%"}>
          <ResponsiveContainer height={400}>
            <AreaChart
              data={graphdata}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
              {/* <YAxis /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#271fb4ff"
                fill="#f0670cff"
                fillOpacity={0.5}
              />
              <Area
                type={cardinal}
                dataKey="price"
                stroke="#82ca9d"
                fill="#180702ff"
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* graph_section_start_here */}
      </div>
    </div>
  );
};

export default AreaGraph;
