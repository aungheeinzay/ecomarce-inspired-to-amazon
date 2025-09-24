import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/auth"
import { apiSlice } from "./slice/api"
import cartReducer, { type CartState } from "./slice/card"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { persistStore } from "redux-persist"

const cartPersistConfig={
    key:"cart",
    storage
}


export const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:persistReducer<CartState>(cartPersistConfig,cartReducer),
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export const persister = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch