import { configureStore } from "@reduxjs/toolkit";
import collapsedLayerSectionsReducer from "./slices/LayerSectionsSlice";
import collapsedAreaSectionsReducer from "./slices/AreaSectionsSlice";
import sidebarReducer from "./slices/SidebarSlice";
import layerGroupsReducer from "./slices/LayersSlice";
import areasReducer from "./slices/AreasSlice";
import layoutReducer from "./slices/LayoutSlice";
import layersDetailReducer from "./slices/DetailedDataSlice";

const store = configureStore({
  reducer: {
    collapsedLayerSections: collapsedLayerSectionsReducer,
    collapsedAreaSections: collapsedAreaSectionsReducer,
    sidebar: sidebarReducer,
    layers: layerGroupsReducer,
    areas: areasReducer,
    layout: layoutReducer,
    layersDetail: layersDetailReducer,
  },
});

export default store;
