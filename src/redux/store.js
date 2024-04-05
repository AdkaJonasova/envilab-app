import { configureStore } from "@reduxjs/toolkit";
import collapsedLayerSectionsReducer from "./slices/LayerSectionsSlice";
import collapsedAreaSectionsReducer from "./slices/AreaSectionsSlice";
import sidebarReducer from "./slices/SidebarSlice";

const store = configureStore({
  reducer: {
    collapsedLayerSections: collapsedLayerSectionsReducer,
    collapsedAreaSections: collapsedAreaSectionsReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
