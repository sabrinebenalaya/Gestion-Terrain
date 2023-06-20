import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { isAuth } from './../../Middelware/isAuth';

const API_URL = "http://localhost:5000/auth/";


export const register = createAsyncThunk(
  "auth/register",
  async (newPartner, thunkAPI) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post(API_URL + "register", newPartner, config);
      if (data.status === 200) {
        toast("Sing Up done Successfully 😊");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (partner,  { dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
   
   
      const res = await axios.post(API_URL + "logIn", partner, config);
     const token = res.data.token;
      localStorage.setItem("jwt", token);
      const loggedInPartner = res.data.partner;
      if (res.status === 200) {
        dispatch(setPartnerLoged({ token, partner: loggedInPartner }));
        isAuth(token);
        toast("Partner loged Successfully 😊");
        return "/";
      } 
    } catch (error) {
      if(error.response.status === 400) {
        
        toast.error(error.response.data.email);
      }else if(error.response.status === 401) {
        toast.error(error.response.data.password);
      }else{
        console.log(error.response);
      }
      
    }
  }
);

const initialState = {
  isAuthenticated: false,
  token: null,
  partner: {},
  partners: [],
};

const sliceAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPartnerLoged: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.partner = action.payload.partner;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { setPartnerLoged, logout } = sliceAuth.actions;

export default sliceAuth.reducer;
