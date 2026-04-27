import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import requestErrorReducer from "./requestErrorSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requestError: requestErrorReducer,
  },
})

// 类型推导
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
