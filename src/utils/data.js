import { Layers, Public } from "@mui/icons-material";
import LayerSettingsPage from "../pages/partials/LayerSettingsPage";
import AreaSettingsPage from "../pages/partials/AreaSettingsPage";
import { SidebarTypes } from "./enums";

// Menu navigation
const layerViewPage = {
  pageKey: "layersView",
  pageName: "menu.layerView",
  pagePath: "/layerView",
};
const selectViewPage = {
  pageKey: "selectView",
  pageName: "menu.areaView",
  pagePath: "/selectView",
};
export const viewPages = [layerViewPage, selectViewPage];
export const settingsPath = "/settings";

// Main menu bar
export const pageName = "EnviMap";

// Settings navigation
const layerSettingsTab = {
  tabId: 0,
  type: SidebarTypes.Layers,
  tabName: "settings.tabs.layers",
  icon: <Layers />,
  navigation: "/settings/layers",
};
const areaSettingsTab = {
  tabId: 1,
  type: SidebarTypes.Areas,
  tabName: "settings.tabs.areas",
  icon: <Public />,
  navigation: "/settings/areas",
};
export const settingsTabs = [layerSettingsTab, areaSettingsTab];

export const settingsPageMapping = new Map([
  [SidebarTypes.Layers, <LayerSettingsPage />],
  [SidebarTypes.Areas, <AreaSettingsPage />],
]);

// Language selector
export const languages = [
  { code: "en", label: "menu.languages.english", flag: "🇺🇸" },
  { code: "cz", label: "menu.languages.czech", flag: "🇨🇿" },
  { code: "sk", label: "menu.languages.slovak", flag: "🇸🇰" },
];

// Layouting
export const mainMenuHeight = 48;
export const pageTopMargin = 6;
export const pageBottomMargin = 6;
export const betweenElementsMargin = 6;
export const selectViewHeaderHeight = 70;
export const selectViewHeaderPadding = 5;

// Draw selector
export const drawOptions = [
  { code: "Point", label: "selectView.drawOptions.point" },
  { code: "LineString", label: "selectView.drawOptions.lineString" },
  { code: "Polygon", label: "selectView.drawOptions.polygon" },
];

// Draw styles
export const drawnFeatureStyle = {
  "stroke-color": "rgba(213, 91, 91, 1)",
  "stroke-width": 2,
  "fill-color": "rgba(213, 91, 91, 0.3)",
  "circle-radius": 6,
  "circle-fill-color": "rgba(213, 91, 91, 1)",
};

export const drawInteractionStyle = {
  "stroke-color": "rgba(255, 107, 107, 1)",
  "stroke-width": 2,
  "fill-color": "rgba(255, 107, 107, 0.3)",
  "circle-radius": 4,
  "circle-fill-color": "rgba(255, 107, 107, 1)",
};
