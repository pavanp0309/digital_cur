import React, { Suspense } from 'react'
import {Routes,Route} from "react-router-dom"
let Home=React.lazy(()=>import("../pages/Home"))
let About=React.lazy(()=>import("../pages/About"))
let Contact=React.lazy(()=>import("../pages/Contact"))
let PageNotFound=React.lazy(()=>import("../pages/PageNotfound"))
let Login=React.lazy(()=>import("../pages/Login"))
let Register=React.lazy(()=>import("../pages/Register"))
let Unauthorized=React.lazy(()=>import("../pages/UnAuthorized"))
let ForgotPassword=React.lazy(()=>import("../pages/ForgotPassword"))
let Dashboard=React.lazy(()=>import("../pages/Dashboard"))
// let PrivateRoutes=React.lazy(()=>import("./PrivateRoutes"))
import PrivateRoutes from './PrivateRoutes'
let PublicRoutes=React.lazy(()=>import("./PublicRoutes"))

const Approutes = () => {
  return (
    <>
  <Suspense fallback={<h6>loading...</h6>}>
        <Routes>
        {/* publicRoutes :where everyone can access */}
        
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>}/>
        <Route path="/register" element={<PublicRoutes><Register/></PublicRoutes>}/>
        <Route path="/forgot-password" element={<PublicRoutes><ForgotPassword/></PublicRoutes>}/>

        {/* Private Routes: only logged in users can access */}
        <Route path="/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
       
        
        {/* universal Route accessibale to everyone by default */}
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  </Suspense>
      
    </>
  )
}

export default Approutes
