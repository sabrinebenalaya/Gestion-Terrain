import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


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
        `http://localhost:5000/users/getuser/${idUser}`,
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

        navigate(`/users/${data.partner}`);
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
          `http://localhost:5000/users/getUsers/${idpartner}`,
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
  async ({newUser, handleClose}, thunkAPI) => {

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
        handleClose()
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({idUser, idpartner, navigate},thunkAPI) => {
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(
        `http://localhost:5000/users/delete/${idUser}`,
        config
      );
     
   
      const data = response.data;
    
      
      if (response.status === 200) {
      
        thunkAPI.dispatch(setAllUsers(data));
        toast("User deleted Successfully 😊");
        navigate(`/users/${idpartner}`)
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
