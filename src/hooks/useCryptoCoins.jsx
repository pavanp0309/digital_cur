import React from 'react'
import { useGetCryptoCoinsQuery } from '../store/apireducers/cryptoApiReducer'

const useCryptoCoins = () => {
    let {data,isLoading,isError}=useGetCryptoCoinsQuery()
   let coins=data?.data?.coins || []
//    console.log(data)//{status: 'success', data: {…}}
   let globalstats=data?.data?.stats || {}
  return {coins,globalstats,isLoading,isError}
}

export default useCryptoCoins
