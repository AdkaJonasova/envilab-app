import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import apiClient from "../../http-common";
import {
  filterAreasByTitle,
  filterFavoriteAreasByTitle,
  getActiveAreas,
  getFavoriteAreas,
} from "../../utils/customFilteringFunctions";
import { FetchStates } from "../../utils/enums";

const handleRecursiveActiveStatusChange = (areaData, areaId, activate) => {
  let result = [];
  areaData.forEach((area) => {
    let newArea = { ...area };
    if (newArea.areaId === areaId) {
      newArea.isActive = activate;
    } else if (newArea.isActive) {
      newArea.isActive = false;
    }
    if (area.geoArea.subAreas.length > 0) {
      newArea.geoArea.subAreas = handleRecursiveActiveStatusChange(
        newArea.geoArea.subAreas,
        areaId,
        activate
      );
    }
    result.push(newArea);
  });
  return result;
};

const handleRecursiveFavoriteStatusChange = (areaData, changedAreas) => {
  let result = [];
  areaData.forEach((area) => {
    let newArea = { ...area };
    const changedArea = changedAreas.find(
      (change) => newArea.areaId === change.identificator
    );
    if (changedArea) {
      newArea.isFavorite = changedArea.value;
    }
    if (area.geoArea.subAreas.length > 0) {
      newArea.geoArea.subAreas = handleRecursiveFavoriteStatusChange(
        newArea.geoArea.subAreas,
        changedAreas
      );
    }
    result.push(newArea);
  });
  return result;
};

const initialState = {
  areas: null,
  areasStatus: FetchStates.Idle,
  areasError: null,
};

export const fetchAreas = createAsyncThunk(
  "areas/fetchAreas",
  async (userId) => {
    const response = await apiClient.get(`/areas/${userId}`);
    return response.data;
  }
);

export const AreasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    changeAreaActiveState(state, action) {
      const { areaId, activate } = action.payload;
      let updatedAreas = handleRecursiveActiveStatusChange(
        state.areas,
        areaId,
        activate
      );
      state.areas = updatedAreas;
    },

    changeAreasFavoriteState(state, action) {
      const { changes } = action.payload;
      let updatedAreas = handleRecursiveFavoriteStatusChange(
        state.areas,
        changes
      );
      state.areas = updatedAreas;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.areasStatus = FetchStates.Loading;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.areasStatus = FetchStates.Succeeded;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.areasStatus = FetchStates.Failed;
        state.areasError = action.error.message;
      });
  },
});

export const selectAreasByTitle = createSelector(
  [(state) => state.areas.areas, (_state, name) => name],
  (areas, name) => filterAreasByTitle(areas, name)
);

export const selectFavoriteAreasByTitle = createSelector(
  [(state) => state.areas.areas, (_state, name) => name],
  (areas, name) => filterFavoriteAreasByTitle(areas, name)
);

export const selectActiveAreas = createSelector(
  [(state) => state.areas.areas],
  (hierarchicalAreas) => getActiveAreas(hierarchicalAreas)
);

export const selectFavoriteAreas = createSelector(
  [(state) => state.areas.areas],
  (hierarchicalAreas) => getFavoriteAreas(hierarchicalAreas)
);

export const selectAreasStatus = (state) => state.areas.areasStatus;
export const selectAreasError = (state) => state.areas.areasError;

export const { changeAreaActiveState, changeAreasFavoriteState } =
  AreasSlice.actions;

export default AreasSlice.reducer;
