import React, { useEffect, useState } from 'react'
import useCryptoCoins from '../../../hooks/useCryptoCoins'
import useCryptoHistory from '../../../hooks/useCryptoHistory'

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
    let selectedCoin=()=>filteredCoins.find((coin)=>coin.uuid==selectedTab)
    // let ar=["BTC","ETH","XRP","USDT","BNB"]
    // console.log(ar.find(coin=>coin=="ETH"))//ETH



  return (
    <div className='card'>
        {/* card_header start */}
        {/*loading start*/}
        <div className="card-header">
            {isloading?
            // loading part
            (<>
             <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
             </div>

            </>):
            // actual coins
            (<>
            {
                selectedCoin?(
                <>
                <span className='text-danger'>{selectedCoin.symbol}</span>
                </>)
                :(<h6>select the coin</h6>)
            }
            
            </>)}
        </div>
        {/* card_header end */}

        {/* card_body_start */}
        {/* card_body_end */}
      
    </div>
  )
}

export default FilterCard
