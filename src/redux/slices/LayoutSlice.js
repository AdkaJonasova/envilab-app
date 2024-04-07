import { createSlice } from "@reduxjs/toolkit";
import {
  getElementBottomMargin,
  getElementHeight,
  getRowCount,
  getRowHeight,
} from "../../utils/customFunctions";
import { LayoutWindows } from "../../utils/enums";

const initialState = {
  rowHeight: 0,
  mapElement: {
    height: 0,
    isActive: false,
    bottomMargin: 0,
  },
  sidebarElement: {
    height: 0,
    isActive: false,
    bottomMargin: 0,
  },
  textWindowElement: {
    height: 0,
    isActive: false,
    bottomMargin: 0,
  },
  graphWindowElement: {
    height: 0,
    isActive: false,
    bottomMargin: 0,
  },
  tableWindowElement: {
    height: 0,
    isActive: false,
    bottomMargin: 0,
  },
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    calculateLayout(state, action) {
      const { layout, windowHeight } = action.payload;
      const rowCount = getRowCount(layout);
      const calculatedHeight = getRowHeight(windowHeight, rowCount);

      state.rowHeight = calculatedHeight;

      layout.forEach((layoutElement) => {
        const height = getElementHeight(
          layoutElement,
          rowCount,
          calculatedHeight
        );
        const bottomMargin = getElementBottomMargin(layoutElement, rowCount);

        switch (layoutElement.i) {
          case LayoutWindows.MapView:
            state.mapElement.bottomMargin = bottomMargin;
            state.mapElement.height = height;
            state.mapElement.isActive = true;
            break;
          case LayoutWindows.ListSidebar:
            state.sidebarElement.bottomMargin = bottomMargin;
            state.sidebarElement.height = height;
            state.sidebarElement.isActive = true;
            break;
          case LayoutWindows.TextData:
            state.textWindowElement.bottomMargin = bottomMargin;
            state.textWindowElement.height = height;
            state.textWindowElement.isActive = true;
            break;
          case LayoutWindows.GraphData:
            state.graphWindowElement.bottomMargin = bottomMargin;
            state.graphWindowElement.height = height;
            state.graphWindowElement.isActive = true;
            break;
          case LayoutWindows.TableData:
            state.tableWindowElement.bottomMargin = bottomMargin;
            state.tableWindowElement.height = height;
            state.tableWindowElement.isActive = true;
            break;
        }
      });
    },
  },
});

export const { calculateLayout } = LayoutSlice.actions;

export default LayoutSlice.reducer;
