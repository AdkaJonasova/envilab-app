import { Layers, Public } from "@mui/icons-material";

// Navigation
const layerViewPage = { pageName: "Layer view", pagePath: "/layerView" };
const selectViewPage = { pageName: "Select view", pagePath: "/selectView" };
export const viewPages = [layerViewPage, selectViewPage];

// Main menu bar
export const pageName = "ENVILAB";
export const mainMenuViews = "Views";
export const mainMenuSettings = "Settings";
export const settingsPath = "/settings";

export const subMenuLayer = "Layer view";
export const subMenuSelect = "Select view";

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
const layerSettingsTab = { tabId: 0, tabName: "Layers", icon: <Layers /> };
const areaSettingsTab = { tabId: 1, tabName: "Areas", icon: <Public /> };
export const settingsTabs = [layerSettingsTab, areaSettingsTab];
