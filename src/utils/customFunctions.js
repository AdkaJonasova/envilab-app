import { settingsTabs } from "./data";

export function getTabIdByType(tab) {
  let foundTab = settingsTabs.find((t) => t.type === tab);
  return foundTab ? foundTab.tabId : 0;
}
