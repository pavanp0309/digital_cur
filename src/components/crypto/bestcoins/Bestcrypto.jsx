import React from 'react'
import useCryptoStats from '../../../hooks/useCryptoStats' //hook call
import AreaGraph from '../../../graphs/AreaGraph'

const Bestcrypto = () => {
    const {bestCoins,isLoading,isError}=useCryptoStats()
    console.log(bestCoins)
    if(isLoading){
        return <h6>loading..</h6>
    }
      if(isError){
        return <h6>error..</h6>
    }

  return (
    <div className='container'>
      <div className="row">
        {
        bestCoins.map(coins=><AreaGraph key={coins.uuid} coins={coins}/>)
        }
      </div>
    </div>
  )
}

export default Bestcrypto
