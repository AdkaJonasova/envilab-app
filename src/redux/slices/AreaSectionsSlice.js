import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const AreaSectionsSlice = createSlice({
  name: "collapsedAreaSections",
  initialState,
  reducers: {
    collapseAreaSection(state, action) {
      let sectionId = action.payload;
      let sectionIndex = state.indexOf(sectionId);

      if (sectionIndex !== -1) {
        state.splice(sectionIndex, 1);
      } else {
        state.push(sectionId);
      }
    },
  },
});

export const { collapseAreaSection } = AreaSectionsSlice.actions;

export default AreaSectionsSlice.reducer;
