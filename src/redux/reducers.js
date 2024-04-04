// reducers.js
import { LAYER_SECTION_COLLAPSE } from "./actions";

const initialState = {
  collapsedLayerSections: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAYER_SECTION_COLLAPSE:
      let sectionId = action.id;
      if (state.collapsedLayerSections.includes(sectionId)) {
        return {
          ...state,
          collapsedLayerSections: state.collapsedLayerSections.filter(
            (id) => id !== sectionId
          ),
        };
      } else {
        return {
          ...state,
          collapsedLayerSections:
            state.collapsedLayerSections.concat(sectionId),
        };
      }
    default:
      return state;
  }
};

export default mainReducer;
