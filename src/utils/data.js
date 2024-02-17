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
export const pageName = "ENVILAB";

// Settings navigation
const layerSettingsTab = {
  tabId: 0,
  tabName: "settings.tabs.layers",
  icon: <Layers />,
  navigation: "/settings/layers",
};
const areaSettingsTab = {
  tabId: 1,
  tabName: "settings.tabs.areas",
  icon: <Public />,
  navigation: "/settings/areas",
};
export const settingsTabs = [layerSettingsTab, areaSettingsTab];

export const settingsPageMapping = new Map([
  [SidebarTypes.Layers, <LayerSettingsPage />],
  [SidebarTypes.Areas, <AreaSettingsPage />],
]);
