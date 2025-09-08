import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
const cardinal = curveCardinal.tension(0.2);
import useCryptoHistory from '../hooks/useCryptoHistory';

const AreaGraph = ({coins}) => {
console.log("gcoins",coins)
const {uuid:coinId,name,symbol,iconUrl,}= coins

const {history,isLoading,isError}=useCryptoHistory(coinId)
if(isLoading){
    return <h6>loading...</h6>
}
if(isError){
    return <h6>error..</h6>
}
let graphdata=history.map((point)=>{
    return {
        date: new Date(point.timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price:point.price
    }
})

  return (
    <div>
      
    </div>
  )
}

export default AreaGraph
