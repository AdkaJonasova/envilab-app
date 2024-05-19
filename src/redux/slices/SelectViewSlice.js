import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  features: [],
};

const SelectViewSlice = createSlice({
  name: "selectView",
  initialState,
  reducers: {
    addFeature(state, action) {
      let { feature } = action.payload;
      state.features.push(feature);
    },
    removeLastFeature(state, action) {
      state.features.pop();
    },
    clearFeatures(state, action) {
      state.features = [];
    },
  },
});

export const selectFeatures = (state) => state.selectView.features;

export const { addFeature, removeLastFeature, clearFeatures } =
  SelectViewSlice.actions;

export default SelectViewSlice.reducer;
