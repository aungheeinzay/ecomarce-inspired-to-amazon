import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/auth"
import { apiSlice } from "./slice/api"
import cartReducer from "./slice/card"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch