import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from './apireducers/cryptoApiReducer'
import { authApi } from './authReducers/authApi'
import authreducer from "./authReducers/authSlice"


export const store = configureStore({
  reducer: {
    auth:authreducer, 
    // auth api services 
    [authApi.reducerPath]:authApi.reducer,
    // Add the generated reducer as a specific top-level slice
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware,authApi.middleware),
})

