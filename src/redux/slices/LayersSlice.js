import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import apiClient from "../../http-common";
import {
  filterFavoriteLayersByTitle,
  filterLayersByTitle,
  getActiveLayers,
  getFavoriteLayers,
} from "../../utils/customFilteringFunctions";
import { FetchStates } from "../../utils/enums";

const initialState = {
  layerGroups: null,
  layersStatus: FetchStates.Idle,
  layersError: null,
};

export const fetchLayerGroups = createAsyncThunk(
  "layerGroups/fetchLayerGroups",
  async (userId) => {
    const response = await apiClient.get(`/layers/${userId}`);
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
    changeLayerFavorites(state, action) {
      const { changes } = action.payload;
      let groups = state.layerGroups;

      groups.forEach((group) => {
        group.layers.forEach((layer) => {
          const changedLayer = changes.find(
            (change) => change.name === layer.name
          );
          if (changedLayer) {
            layer.isFavorite = changedLayer.value;
            if (!changedLayer.value) {
              layer.isActive = false;
            }
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

export const selectLayersByTitle = createSelector(
  [(state) => state.layers.layerGroups, (state, name) => name],
  (groups, name) => filterLayersByTitle(groups, name)
);

export const selectFavoriteLayersByTitle = createSelector(
  [(state) => state.layers.layerGroups, (state, name) => name],
  (groups, name) => filterFavoriteLayersByTitle(groups, name)
);

export const selectActiveLayers = createSelector(
  [(state) => state.layers.layerGroups],
  (groups) => getActiveLayers(groups)
);

export const selectFavoriteLayers = createSelector(
  [(state) => state.layers.layerGroups],
  (groups) => getFavoriteLayers(groups)
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

export const selectLayersStatus = (state) => state.layers.layersStatus;
export const selectLayersError = (state) => state.layers.layersError;

export const {
  changeLayerActiveState,
  changeLayerFavorites,
  changeLayerOpacity,
} = LayerGroupsSlice.actions;

export default LayerGroupsSlice.reducer;
