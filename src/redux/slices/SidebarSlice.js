import { createSlice } from "@reduxjs/toolkit";
import { SidebarTypes } from "../../utils/enums";

const initialState = { type: SidebarTypes.Layers, selectedLayer: undefined };

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeSidebarType(state, action) {
      let { type, selectedLayer } = action.payload;

      state.type = type;
      state.selectedLayer = selectedLayer;
    },
  },
});

export const { changeSidebarType } = SidebarSlice.actions;

export default SidebarSlice.reducer;
