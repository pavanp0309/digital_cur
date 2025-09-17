import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'

const PrivateRoutes = ({children}) => {
  console.log(children)
  const {user,loading}=useSelector((state)=>state.auth)
  if(loading) return <Spin/>
 
  if(!user)return <Navigate to="/login" replace/>

//  if user exists navigate to dashbaord else navigate logi page
  return user ?children:<Navigate to="/login" replace/>
}

export default PrivateRoutes
