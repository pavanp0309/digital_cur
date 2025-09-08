
import React from 'react'
import { useGetCryptoStatsQuery } from '../store/apireducers/cryptoApiReducer'

const useCryptoStats = () => {
    const {data,isLoading,isError}=useGetCryptoStatsQuery()
    const {bestCoins,newestCoins}=data?.data || {}
  return{bestCoins,newestCoins,isLoading,isError}
}

export default useCryptoStats
