import React, { useEffect, useState } from 'react'
import useCryptoCoins from '../../../hooks/useCryptoCoins'
import useCryptoHistory from '../../../hooks/useCryptoHistory'
import LineBarGraph from '../../../graphs/LineBarGraph'

let timePeriods=["3h", "24h"," 7d" ,"30d" ,"3m", "1y" ,"3y" ,"5y"]
const FilterCard = () => {
    // fetching coins from an Api to display graph based on the coin history
    const {coins,isloading,isError}=useCryptoCoins()
     console.log("coins",coins) 

     if(isloading){
        return <h6>loading..</h6>
     }
      if(isError){
        return <h6>error..</h6>
     }

    //  selecting the default TimePeriod 
    let [timePeriod,setTimePeriod]=useState("1y")

    // filtering the coins to display from obtained data

    let filteredCoins=coins.filter((ele)=>["BTC","ETH","XRP","USDT","BNB"].includes(ele.symbol))
    console.log(filteredCoins)

    // keeping the active tab when user selected
    const [selectedTab,setSelectedTab]=useState("")
    console.log("stb",selectedTab)

    // getting History of a selected Coins 
    const {history}=useCryptoHistory(selectedTab,timePeriod)
    console.log(history)

    // to keep atleast one tab active one Browser is loaded 
    useEffect(()=>{
          if(coins.length>0){
            setSelectedTab(coins[0].uuid)
          }
    },[coins])

    // functions to handle the timePeriod and selectedtabs 
    let handleTabkey=(key)=>setSelectedTab(key)
    let handleTimePeriod=(e)=>setTimePeriod(e.target.value)
    let selectedCoin=filteredCoins.find((coin)=>coin.uuid==selectedTab)
    console.log(selectedCoin)
    // let ar=["BTC","ETH","XRP","USDT","BNB"]
    // console.log(ar.find(coin=>coin=="ETH"))//ETH



  return (
    <div className='card mx-2 my-2'>
        {/* card_header start */}
        {/*loading start*/}
        <div className='p-2 border-bottom mb-2'>
            {isloading?
            // loading part
            (<>
             <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
             </div>

            </>):
            // actual selceted coin
            (<div className='d-flex justify-content-between'>
            {
                selectedCoin?(
                <div>
                <img src={selectedCoin.iconUrl} className='mx-1' alt=""  width={"30px"} height={'30px'} style={{borderRadius:"100%"}}/>
                <span className='text-danger'>{selectedCoin.symbol}</span>
                </div>)
                :(<h6>select the coin</h6>)
            }

            {/* Timeperiods */}
            <select name="" id="" className='form-select w-25' value={timePeriod} onChange={handleTimePeriod}>
            {timePeriods.map(ele=><option className='' key={ele} value={ele}>{ele}</option>)}
            </select>
            </div>)}
        </div>
        {/* card_header end */}
        {/* Tabs for Coins */}
        <ul className='nav nav-tabs'>
          {
            filteredCoins.map((scoin)=>(
              <li class="nav-item">
                <button className='btn btn-success mx-1 mb-1'
                onClick={()=>handleTabkey(scoin.uuid)}
                >
                   {scoin.symbol}
                </button>
              </li>
            ))
          }
        </ul>

        {/* card_body_start */}
        <div>
          <LineBarGraph history={history}/>
        </div>
        {/* card_body_end */}
      
    </div>
  )
}

export default FilterCard
