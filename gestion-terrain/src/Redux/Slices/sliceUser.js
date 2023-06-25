import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/users/";

export const getUserByID = createAsyncThunk(
  "users/user",
  async (idUser, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `http://localhost:5000/users/user/${idUser}`,
        config
      );
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setUserProfil(data));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ userToEdit, iduser, navigate }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `http://localhost:5000/users/update/${iduser}`,
        userToEdit,
        config
      );
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setUserProfil(data));

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

export const getUsers = createAsyncThunk(
    "users/Alluser",
    async (idpartner, thunkAPI) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const response = await axios.get(
          `http://localhost:5000/users/${idpartner}`,
          config
        );
        const data = response.data;
  
        if (response.status === 200) {
          thunkAPI.dispatch(setAllUsers(data));
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
);

export const addUser = createAsyncThunk(
  "users/add",
  async ({newUser}, thunkAPI) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post( `http://localhost:5000/users/add`,   newUser, config);
      
      if (data.status === 200) {
        thunkAPI.dispatch(setAllUsers(data));
        toast("User added Successfully 😊");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);
const initialState = {
  user: {},
  users: [],
};

const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfil: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
        state.users = action.payload;
      },
  },
});

export const { setUserProfil, setAllUsers } = sliceUser.actions;

export default sliceUser.reducer;
