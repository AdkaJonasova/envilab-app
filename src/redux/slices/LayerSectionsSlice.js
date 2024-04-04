import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const LayerSectionSlice = createSlice({
  name: "collapsedLayerSections",
  initialState,
  reducers: {
    collapseLayerSection(state, action) {
      let sectionName = action.payload;
      let sectionIndex = state.indexOf(sectionName);

      if (sectionIndex !== -1) {
        state.splice(sectionIndex, 1);
      } else {
        state.push(sectionName);
      }
    },
  },
});

export const { collapseLayerSection } = LayerSectionSlice.actions;

export default LayerSectionSlice.reducer;
