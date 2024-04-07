import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const DetailedDataSlice = createSlice({
  name: "detailedData",
  initialState,
  reducers: {
    addDetailedData(state, action) {
      const { title, data } = action.payload;
      const details = {
        title: title,
        data: data,
      };
      state.push(details);
    },
    clearDetailedData(state, action) {
      state = [];
    },
  },
});
