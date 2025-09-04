import React from 'react'
import useCryptoHistory from './hooks/useCryptoHistory'


const App = () => {
 let {data}=useCryptoHistory()
 console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default App
