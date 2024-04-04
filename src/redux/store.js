import { configureStore } from "@reduxjs/toolkit";
import collapsedLayerSectionsReducer from "./slices/LayerSectionsSlice";

const store = configureStore({
  reducer: {
    collapsedLayerSections: collapsedLayerSectionsReducer,
  },
});

export default store;
