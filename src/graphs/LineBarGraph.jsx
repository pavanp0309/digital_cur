import React from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const LineBarGraph = ({history}) => {
  console.log(history)

    let graphdata = history.map((point) => ({
    date: new Date(point?.timestamp * 1000).toLocaleDateString(),
    price: point?.price,
  })).slice(0,30);

  return (
    <div  style={{width:"100%", height:"400px"}}>
         <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={graphdata}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          {/* <XAxis dataKey="price" scale="band" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Area type="monotone" dataKey="price" fill="#f04c0bff" stroke="#d8848aff" />
          <Bar dataKey="price" barSize={100} fill="#413ea0" />
          <Line type="monotone" dataKey="price" stroke="#26ff00ff" />
          <Scatter dataKey="price" fill="blue" />
        </ComposedChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default LineBarGraph
