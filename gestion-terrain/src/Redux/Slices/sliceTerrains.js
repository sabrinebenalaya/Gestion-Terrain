import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const getTerrainByID = createAsyncThunk(
  "terrains/terrain",
  async (idTerrain, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `http://localhost:5000/terrains/getTerrain/${idTerrain}`,
        config
      );
      const data = response.data;
      if (response.status === 200) {
        thunkAPI.dispatch(setTerrain(data));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);

export const updateTerrain = createAsyncThunk(
  "terrains/update",
  async ({ terrainToEdit, idterrain, navigate }, thunkAPI) => {
    console.log("edit terrainToEdit", terrainToEdit)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `http://localhost:5000/terrains/update/${idterrain}`,
        terrainToEdit,
        config
      );
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setTerrain(data));

        navigate("/terrains/");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg);
    }
  }
); 

export const getTerrains = createAsyncThunk(
    "terrain/getTerrains",
    async (idpartner, thunkAPI) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
  
        const response = await axios.get(
          `http://localhost:5000/terrains/getTerrains/${idpartner}`,
          config
        );
       
        const data = response.data;
  
        if (response.status === 200) {
          thunkAPI.dispatch(setAllTerrains(data ));
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
);

export const addTerrain = createAsyncThunk(
  "terrains/add",
  async ({newTerrain, navigate}, thunkAPI) => {

    try {
      const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
      };

      const data = await axios.post( `http://localhost:5000/terrains/add`,   newTerrain, config);
   
      if (data.status === 200) {
        thunkAPI.dispatch(setAllTerrains(data));
        toast("Terrain added Successfully 😊");
       navigate("/terrains/");
      }
    } catch (error) {
       
      toast.error(error.response.data.msg);
    }
  }
);

export const getAllterrains = createAsyncThunk(
  "terrain/getAllterrains",
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `http://localhost:5000/terrains/getAllTerrains/`,
        config
      );
     
      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setAllTerrains(data));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);


export const deleteTerrain= createAsyncThunk(
  "terrains/delete",
  async ({idTerrain, navigate},thunkAPI) => {
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(
        `http://localhost:5000/terrains/delete/${idTerrain}`,
        config
      );
     
      const data = response.data;
    
      
      if (response.status === 200) {
      
        thunkAPI.dispatch(setAllTerrains(data));
        toast("Terrain deleted Successfully 😊");
      }
    } catch (error) {
   
      toast.error(error.response.data.msg);
    }
  }
);

export const search = createAsyncThunk(
  "terrain/search",
  async ({ searchedTerrain }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/terrains/search",
        searchedTerrain,
        config
      );

      const data = response.data;

      if (response.status === 200) {
        thunkAPI.dispatch(setAllTerrains(data));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);


const initialState = {
  terrain: {},
  terrains: [],
};

const sliceTerrain = createSlice({
  name: "terrain",
  initialState,
  reducers: {
    setTerrain: (state, action) => {
      state.terrain = action.payload;
    },
    setAllTerrains: (state, action) => {
        state.terrains = action.payload;
      },
  
    

  },
});

export const { setTerrain, setAllTerrains} = sliceTerrain.actions;

export default sliceTerrain.reducer;
