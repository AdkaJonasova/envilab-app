import { configureStore } from "@reduxjs/toolkit";
import collapsedLayerSectionsReducer from "./slices/LayerListSectionsSlice";
import collapsedAreaSectionsReducer from "./slices/AreaListSectionsSlice";
import sidebarReducer from "./slices/SidebarSlice";
import layerGroupsReducer from "./slices/LayersSlice";
import areasReducer from "./slices/AreasSlice";
import layoutReducer from "./slices/LayoutSlice";
import layersDetailReducer from "./slices/DetailedDataSlice";
import layersSettingsReducer from "./slices/LayerSettingsSlice";
import areasSettingsReducer from "./slices/AreaSettingsSlice";
import selectViewReducer from "./slices/SelectViewSlice";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    sidebar: sidebarReducer,
    layers: layerGroupsReducer,
    layersDetail: layersDetailReducer,
    areas: areasReducer,
    layerSettings: layersSettingsReducer,
    areaSettings: areasSettingsReducer,
    collapsedLayerSections: collapsedLayerSectionsReducer,
    collapsedAreaSections: collapsedAreaSectionsReducer,
    selectView: selectViewReducer,
  },
});

export default store;
