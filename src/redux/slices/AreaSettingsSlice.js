import { createSlice } from "@reduxjs/toolkit";

const removeFromChanged = (index, newChangedAreas) => {
  newChangedAreas.splice(index, 1);
};

const addToChanged = (area, newChangedAreas) => {
  let changedArea = {
    identificator: area.areaId,
    value: !area.isFavorite,
  };
  newChangedAreas.push(changedArea);
};

const handleRecursiveMarkArea = (
  area,
  newChangedAreas,
  parentIsFavorite,
  useParent
) => {
  // child area should have the same value as parent
  if (useParent) {
    let areaChangedIndex = newChangedAreas.findIndex(
      (a) => a.identificator === area.areaId
    );

    // child area is changed and the changed value is not equal to parent value -> remove from changed
    if (areaChangedIndex !== -1 && !area.isFavorite !== parentIsFavorite) {
      removeFromChanged(areaChangedIndex, newChangedAreas);

      // child area is not changes and the original value is not equal to parent value -> add to changed
    } else if (area.isFavorite !== parentIsFavorite) {
      addToChanged(area, newChangedAreas);
    }

    // change the value only based on the area itself
  } else {
    let areaChangedIndex = newChangedAreas.findIndex(
      (a) => a.identificator === area.areaId
    );
    if (areaChangedIndex !== -1) {
      removeFromChanged(areaChangedIndex, newChangedAreas);
      area.geoArea.subAreas.forEach((subArea) =>
        handleRecursiveMarkArea(subArea, newChangedAreas, area.isFavorite, true)
      );
    } else {
      addToChanged(area, newChangedAreas);
      area.geoArea.subAreas.forEach((subArea) =>
        handleRecursiveMarkArea(
          subArea,
          newChangedAreas,
          !area.isFavorite,
          true
        )
      );
    }
  }
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
      const { areaId } = action.payload;
      const areaIndex = state.collapsedAreas.indexOf(areaId);

      if (areaIndex !== -1) {
        state.collapsedAreas.splice(areaIndex, 1);
      } else {
        state.collapsedAreas.push(areaId);
      }
    },

    markArea(state, action) {
      const { area } = action.payload;
      let newChangedAreas = [...state.changedAreas];
      handleRecursiveMarkArea(area, newChangedAreas, area.isFavorite, false);
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
