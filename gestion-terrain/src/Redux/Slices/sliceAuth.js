import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { isAuth } from './../../Middelware/isAuth';
const API_URL = "http://localhost:5000/auth/";


export const register = createAsyncThunk(
  "auth/register",
  async (newPartner, thunkAPI) => {
    console.log("newPartner", newPartner);
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
  async (partner) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
   
   
      const res = await axios.post(API_URL + "logIn", partner, config);
      const { token, user } = res.data;
      localStorage.setItem("jwt", token);

      console.log("ccc",token)
      if (res.status === 200) {
        isAuth(token);
        toast("User loged Successfully 😊");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
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
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {  logout } = sliceAuth.actions;

export default sliceAuth.reducer;
