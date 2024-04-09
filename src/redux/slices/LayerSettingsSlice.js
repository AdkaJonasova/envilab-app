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
      const { layerName, value } = action.payload;
      let layerIndex = state.changedLayers.findIndex(
        (layer) => layer.name === layerName
      );

      if (layerIndex !== -1) {
        state.changedLayers.splice(layerIndex, 1);
      } else {
        const changedLayer = {
          name: layerName,
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
