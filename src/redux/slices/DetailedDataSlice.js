import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailData: [],
  selectedLayer: null,
  detailPopupOpened: false,
};

const DetailedDataSlice = createSlice({
  name: "detailedData",
  initialState,
  reducers: {
    addDetailedData(state, action) {
      const { identificator, title, data } = action.payload;
      const details = {
        identificator: identificator,
        title: title,
        data: data,
      };
      state.detailData.push(details);
    },
    clearDetailedData(state, _action) {
      state.detailData = [];
      state.selectedLayer = null;
    },
    selectLayer(state, action) {
      const { identificator } = action.payload;
      state.selectedLayer = identificator;
    },
    openDetailedPopup(state, _action) {
      state.detailPopupOpened = true;
    },
    closeDetailedPopup(state, _action) {
      state.detailPopupOpened = false;
    },
  },
});

export const selectDetailedData = (state) => state.layersDetail.detailData;

export const selectSelectedLayer = (state) => state.layersDetail.selectedLayer;

export const selectIsDetailDisplayed = (state) =>
  state.layersDetail.detailPopupOpened;

export const selectDataForSelectedLayer = (state) =>
  state.layersDetail.detailData.find(
    (data) => data.identificator === state.layersDetail.selectedLayer
  );

export const {
  addDetailedData,
  clearDetailedData,
  selectLayer,
  openDetailedPopup,
  closeDetailedPopup,
} = DetailedDataSlice.actions;

export default DetailedDataSlice.reducer;
