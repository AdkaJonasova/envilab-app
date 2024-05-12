import { createSlice } from "@reduxjs/toolkit";

const handleRecursiveMarkArea = (area, newChangedAreas, value) => {
  let foundArea = newChangedAreas.find((a) => a.identificator === area.name);

  if (foundArea !== undefined && foundArea.value !== value) {
    let foundAreaIndex = newChangedAreas.findIndex(
      (a) => a.identificator === area.name
    );
    newChangedAreas.splice(foundAreaIndex, 1);
  } else if (foundArea === undefined && area.isFavorite !== value) {
    let changedArea = {
      identificator: area.name,
      value: value,
    };
    newChangedAreas.push(changedArea);
  }

  area.subAreas.forEach((subArea) =>
    handleRecursiveMarkArea(subArea, newChangedAreas, value)
  );
};

const initialState = {
  collapsedAreas: [],
  changedAreas: [],
};

const AreaSettingsSlice = createSlice({
  name: "areaSettings",
  initialState,
  reducers: {
    collapseAreaSettingsArea(state, action) {
      const { areaName } = action.payload;
      const areaIndex = state.collapsedAreas.indexOf(areaName);

      if (areaIndex !== -1) {
        state.collapsedAreas.splice(areaIndex, 1);
      } else {
        state.collapsedAreas.push(areaName);
      }
    },

    markArea(state, action) {
      const { area, value } = action.payload;
      let newChangedAreas = [...state.changedAreas];
      handleRecursiveMarkArea(area, newChangedAreas, value);
      state.changedAreas = newChangedAreas;
    },

    clearChanges(state, action) {
      state.changedAreas = [];
    },
  },
});

export const selectCollapsedAreas = (state) =>
  state.areaSettings.collapsedAreas;
export const selectChangedAreas = (state) => state.areaSettings.changedAreas;

export const { collapseAreaSettingsArea, markArea, clearChanges } =
  AreaSettingsSlice.actions;

export default AreaSettingsSlice.reducer;
