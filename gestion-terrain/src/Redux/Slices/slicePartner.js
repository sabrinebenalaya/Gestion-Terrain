import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/partners/";

export const getPartnerByID = createAsyncThunk(
  "partners/partner",
  async (idPartner, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `http://localhost:5000/partners/partner/${idPartner}`,
        config
      );
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setPartnerProfil(data));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

export const updatePartner = createAsyncThunk(
  "partners/update",
  async ({ partnerToEdit, idPartner, navigate }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `http://localhost:5000/partners/update/${idPartner}`,
        partnerToEdit,
        config
      );
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setPartnerProfil(data));

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

const initialState = {
  partner: {},
  partners: [],
};

const slicePartner = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setPartnerProfil: (state, action) => {
      state.partner = action.payload;
    },
  },
});

export const { setPartnerProfil } = slicePartner.actions;

export default slicePartner.reducer;
