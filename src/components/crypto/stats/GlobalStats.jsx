import React from 'react'
import useCryptoCoins from '../../../hooks/useCryptoCoins'

const GlobalStats = () => {
    const {globalstats,isLoading,isError}=useCryptoCoins()
    console.log("gs",globalstats)
  return (
    <div className='row'>
        {

        }
      
    </div>
  )
}

export default GlobalStats
