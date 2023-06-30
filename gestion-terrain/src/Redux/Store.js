
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/sliceAuth"
import partnerReducer  from "./Slices/slicePartner"
import userReducer from "./Slices/sliceUser"
import terrainReducer from "./Slices/sliceTerrains"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    user: userReducer,
    terrain: terrainReducer,
  },
})

