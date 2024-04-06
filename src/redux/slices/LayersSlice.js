import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import apiClient from "../../http-common";
import { filterLayersByName } from "../../utils/customFunctions";
import { FetchStates } from "../../utils/enums";

const initialState = {
  layerGroups: null,
  layersStatus: FetchStates.Idle,
  layersError: null,
};

export const fetchLayerGroups = createAsyncThunk(
  "layerGroups/fetchLayerGroups",
  async (userId) => {
    const response = await apiClient.get(`/layers/favorite/${userId}`);
    return response.data;
  }
);

export const LayerGroupsSlice = createSlice({
  name: "layerGroups",
  initialState,
  reducers: {
    changeLayerActiveState(state, action) {
      const { layerName } = action.payload;
      let groups = state.layerGroups;
      groups.forEach((group) => {
        group.layers.forEach((layer) => {
          if (layer.name === layerName) {
            layer.isActive = !layer.isActive;
          }
        });
      });
    },
    changeLayerOpacity(state, action) {
      const { layerName, opacity } = action.payload;
      let groups = state.layerGroups;
      groups.forEach((group) => {
        group.layers.forEach((layer) => {
          if (layer.name === layerName) {
            layer.opacity = opacity;
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLayerGroups.pending, (state) => {
        state.layersStatus = FetchStates.Loading;
      })
      .addCase(fetchLayerGroups.fulfilled, (state, action) => {
        state.layersStatus = FetchStates.Succeeded;
        state.layerGroups = action.payload;
      })
      .addCase(fetchLayerGroups.rejected, (state, action) => {
        state.layersStatus = FetchStates.Failed;
        state.layersError = action.error.message;
      });
  },
});

export const selectLayersByName = createSelector(
  [(state) => state.layers.layerGroups, (state, name) => name],
  (groups, name) => filterLayersByName(groups, name)
);

export const selectActiveLayers = createSelector(
  [(state) => state.layers.layerGroups],
  (groups) => {
    let layers = [];

    groups.forEach((group) => {
      group.layers
        .filter((layer) => layer.isActive)
        .forEach((layer) => {
          layers.push(layer);
        });
    });

    return layers;
  }
);

export const selectLayerByName = createSelector(
  [(state) => state.layers.layerGroups, (_state, name) => name],
  (groups, name) => {
    let foundLayer = null;

    groups.forEach((group) => {
      group.layers.forEach((layer) => {
        if (layer.name === name) {
          foundLayer = layer;
        }
      });
    });

    return foundLayer;
  }
);

export const { changeLayerActiveState, changeLayerOpacity } =
  LayerGroupsSlice.actions;

export default LayerGroupsSlice.reducer;
