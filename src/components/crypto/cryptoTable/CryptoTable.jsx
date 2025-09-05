import React from 'react'
import { Table } from "antd";
import millify from "millify";
import useCryptoCoins from '../../../hooks/useCryptoCoins';
import useCryptoHistory from '../../../hooks/useCryptoHistory';
import LineCharts from '../../../graphs/LineChart';

const CryptoTable = () => {
  let {coins,isLoading,isError}=useCryptoCoins()

  let columns=[
    {
      key:"rank",
      title: 'Rank',
      dataIndex:"rank",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center"
    },
    {
      key:"name",
      title: 'Name',
      dataIndex:"name",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (text,record) => (
        <div className='d-flex justify-content-center align-content-center'>
         <img src={record.iconUrl} alt={record.name} className='mx-1' width={"30px"} height={"30px"}/>
         <span>{record.symbol}</span>
        </div>
      ),
    },
    {
      key:"price",
      title: 'Price',
      dataIndex:"price",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (text,record) => `${millify(record.price)}`,
    },
    {
      key:"24hVolume",
      title: 'Total24hvol',
      dataIndex:"24hVolume",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (text,record) => `${millify(text)}`,
    },
    {
      key:"marketCap",
      title: 'MarketCap',
      dataIndex:"marketCap",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (text,record) => `${millify(text)}`,
    },
    {
      key:"change",
      title: 'Change',
      dataIndex:"change",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (text,record) => (
        <>
        <span style={{color:`${parseFloat(text)<0?"red":"green"}`}}>{text}</span>
        </>
      ),
    },
    {
      key:"uuid",
      title: 'Graph',
      dataIndex:"uuid",
      responsive:["xs","sm","md","lg","xl","xxl"],
      align:"center",
      render: (coinId) => <History data={coinId}/>,
    },
  ]

  // Historical data of each coin
  let History=({data})=>{
      let {history,isLoading,isError}=useCryptoHistory(data)
      if(isLoading){
        return <h6>loading...</h6>
      }
      if(isError){
        return <h6>error..</h6>
      }
    return <LineCharts  data={history}/>
  }



  return (
    <div className='container-fluid'>
        <Table dataSource={coins} bordered  columns={columns} key={coins.uuid} loading={isLoading}/>
    </div>
    )
}

export default CryptoTable
