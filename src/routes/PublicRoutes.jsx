import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'

const PublicRoutes = ({children}) => {
  console.log(children)
  const {user,loading}=useSelector((state)=>state.auth)
  if(loading) return <Spin/>
//  if user exists navigate to dashbaord else navigate logi page
  return user ?<Navigate to="/dashboard" replace/>:children
}

export default PublicRoutes
