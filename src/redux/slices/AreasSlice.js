import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import apiClient from "../../http-common";
import {
  filterAreasByName,
  getZoomedToAreas,
} from "../../utils/customFunctions";
import { FetchStates } from "../../utils/enums";

const handleRecursiveStatusChange = (areaData, areaId, activate) => {
  let updatesAreas = [];
  areaData.forEach((area) => {
    let updatedArea = { ...area };
    if (updatedArea.areaId === areaId) {
      updatedArea.isActive = activate;
    } else if (updatedArea.isActive) {
      updatedArea.isActive = false;
    }
    if (area.geoArea.subAreas.length > 0) {
      updatedArea.geoArea.subAreas = handleRecursiveStatusChange(
        updatedArea.geoArea.subAreas,
        areaId,
        activate
      );
    }
    updatesAreas.push(updatedArea);
  });
  return updatesAreas;
};

const initialState = {
  areas: null,
  areasStatus: FetchStates.Idle,
  areasError: null,
};

export const fetchAreas = createAsyncThunk(
  "areas/fetchAreas",
  async (userId) => {
    const response = await apiClient.get(`/areas/favorite/${userId}`);
    return response.data;
  }
);

export const AreasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    changeAreaActiveState(state, action) {
      const { areaId, activate } = action.payload;
      let updatedAreas = handleRecursiveStatusChange(
        state.areas,
        areaId,
        activate
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

export const selectAreasByName = createSelector(
  [(state) => state.areas.areas, (_state, name) => name],
  (areas, name) => filterAreasByName(areas, name)
);

export const selectActiveAreas = createSelector(
  [(state) => state.areas.areas],
  (hierarchicalAreas) => getZoomedToAreas(hierarchicalAreas)
);

export const { changeAreaActiveState } = AreasSlice.actions;

export default AreasSlice.reducer;
