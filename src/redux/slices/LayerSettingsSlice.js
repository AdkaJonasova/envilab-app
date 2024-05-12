import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsedSections: [],
  changedLayers: [],
};

export const LayerSettingsSlice = createSlice({
  name: "layerSettings",
  initialState,
  reducers: {
    collapseLayerSettingsSection(state, action) {
      const { sectionName } = action.payload;
      let sectionIndex = state.collapsedSections.indexOf(sectionName);

      if (sectionIndex !== -1) {
        state.collapsedSections.splice(sectionIndex, 1);
      } else {
        state.collapsedSections.push(sectionName);
      }
    },

    markLayer(state, action) {
      const { layer, value } = action.payload;
      let foundLayer = state.changedLayers.find((l) => l.name === layer.name);

      if (foundLayer !== undefined && foundLayer.value !== value) {
        let foundLayerIndex = state.changedLayers.findIndex(
          (l) => l.name === layer.name
        );
        state.changedLayers.splice(foundLayerIndex, 1);
      } else if (foundLayer === undefined && layer.isFavorite !== value) {
        const changedLayer = {
          name: layer.name,
          value: value,
        };
        state.changedLayers.push(changedLayer);
      }
    },

    clearChanges(state, action) {
      state.changedLayers = [];
    },
  },
});

export const selectCollapsedSections = (state) =>
  state.layerSettings.collapsedSections;

export const selectChangedLayers = (state) => state.layerSettings.changedLayers;

export const { collapseLayerSettingsSection, markLayer, clearChanges } =
  LayerSettingsSlice.actions;

export default LayerSettingsSlice.reducer;
