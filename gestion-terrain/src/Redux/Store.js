
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/sliceAuth"
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

