import { Layers, Public } from "@mui/icons-material";
import LayerSettingsPage from "../pages/partials/LayerSettingsPage";
import AreaSettingsPage from "../pages/partials/AreaSettingsPage";

// Navigation
const layerViewPage = { pageName: "Layering tool", pagePath: "/layerView" };
const selectViewPage = {
  pageName: "Area editor tool",
  pagePath: "/selectView",
};
export const viewPages = [layerViewPage, selectViewPage];

// Main menu bar
export const pageName = "ENVILAB";
export const mainMenuViews = "Views";
export const mainMenuSettings = "Settings";
export const settingsPath = "/settings";

// Tabs
export const LayersTab = "Layers";
export const AreasTab = "Areas";

// Layer customization
export const layerCustomizationHeader = "Customize";
export const layerCustomizationOpacity = "Opacity";

// Layer card
export const layerCardAdd = "Add";
export const layerCardRemove = "Remove";
export const layerCardCustomize = "Customize";

// Area card
export const areaCardUse = "Use";
export const areaCardEdit = "Edit";

// Area list
export const createAreaSet = "Create area set";
export const chooseAreaSet = "Choose area set";
export const noFavoriteAreas =
  "There are no areas to display. Please select your favorite areas in settings.";

// Layer list
export const noFavoriteLayers =
  "There are no layers to display. Please select your favorite layers in settings.";

// Select view
export const selectViewTitle = "Select area view";
export const selectViewSubtitle =
  "Please select at least 3 points on the map below to define a new area.";

// Select view sidebar
export const selectViewSidebarTitle = "New area";
export const selectViewSelectedPoints = "Selected points";
export const selectViewAreaName = "Area name";
export const selectViewSaveBtnText = "Save";
export const selectViewTooltip = "Tooltip coordinates";
export const sViewSidebarNewPointBtnText = "New point";

// Settings
const layerSettingsTab = {
  tabId: 0,
  tabName: "Layers",
  icon: <Layers />,
  navigation: "/settings/layers",
};
const areaSettingsTab = {
  tabId: 1,
  tabName: "Areas",
  icon: <Public />,
  navigation: "/settings/areas",
};
export const settingsTabs = [layerSettingsTab, areaSettingsTab];

export const settingsPageMapping = new Map([
  ["layers", <LayerSettingsPage />],
  ["areas", <AreaSettingsPage />],
]);

export const layerSettingsTitle = "Layers settings";
export const layerSettingsAnnotation =
  "Select your favorite layers, which are going to be displayed in the side bar in the Layers' view";
export const areaSettingsTitle = "Area settings";
export const areaSettingsAnnotation =
  "Select your favorite area, which are going to be displayed in the side bar in the Areas' view";

export const settingsSaveBtn = "Save changes";
export const settingsResetBtn = "Reset changes";
