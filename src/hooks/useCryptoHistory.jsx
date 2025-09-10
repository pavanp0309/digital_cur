import React from 'react'
import { useGetCoinHistoryQuery } from '../store/apireducers/cryptoApiReducer'

const useCryptoHistory = (coinId="Qwsogvtv82FCd",timePeriod="24h") => {
    let {data,isLoading,isError}=useGetCoinHistoryQuery({coinId,timePeriod})
    let history=data?.data?.history || []
  return {history,isLoading,isError}
}

export default useCryptoHistory
