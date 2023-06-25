
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/sliceAuth"
import partnerReducer  from "./Slices/slicePartner"
import userReducer from "./Slices/sliceUser"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    user: userReducer,
  },
})

