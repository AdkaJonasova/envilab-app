import { Layers, Public } from "@mui/icons-material";
import LayerSettingsPage from "../pages/partials/LayerSettingsPage";
import AreaSettingsPage from "../pages/partials/AreaSettingsPage";
import { SidebarTypes } from "./enums";
// const path = require("path");

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
export const pageName = "ENVILAB";

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

// Data folder
// export const dataFolder = path.join(process.env.PUBLIC_URL, "resources");
