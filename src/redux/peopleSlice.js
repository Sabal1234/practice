import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    const savedData = JSON.parse(localStorage.people || "null");
    if (savedData) {
      return savedData; 
    } else {
      const apiData = await apiClient.loadPeople(); 
      localStorage.people = JSON.stringify(apiData); 
      return apiData;
    }
  }
);

export const savePeople = createAsyncThunk(
  "people/savePeople",
  async (people) => {
    return new Promise((resolve, reject) => {
      const success = true;
      setTimeout(() => {
        if (!success) return reject("Save failed");
        localStorage.people = JSON.stringify(people);
        resolve(people);
      }, 1000);
    });
  }
);

const initialState = {
  people: [],
  person: { name: "", email: "", course: null, department: null },
  isLoading: false,
  saveStatus: "READY",
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    updatePersonField: (state, action) => {
      const { name, value } = action.payload;
      state.person[name] = value;
      state.saveStatus = "READY";
    },
    resetPerson: (state) => {
      state.person = { name: "", email: "", course: null, department: null };
      state.saveStatus = "READY";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.people = action.payload;
        state.isLoading = false;
      })
      .addCase(savePeople.pending, (state) => {
        state.saveStatus = "SAVING";
      })
      .addCase(savePeople.fulfilled, (state, action) => {
        state.people = action.payload;
        state.person = { name: "", email: "", course: null, department: null };
        state.saveStatus = "SUCCESS";
      })
      .addCase(savePeople.rejected, (state) => {
        state.saveStatus = "ERROR";
      });
  },
});

export const { updatePersonField, resetPerson } = peopleSlice.actions;
export default peopleSlice.reducer;
