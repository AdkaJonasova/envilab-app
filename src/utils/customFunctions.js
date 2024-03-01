import { SidebarTypes } from "./enums";
import { settingsTabs } from "./data";

export function getRowCount(layoutConfig) {
  let requiredRowCount = 0;
  for (let i = 0; i < layoutConfig.length; i++) {
    const layoutElement = layoutConfig[i];
    const rowEnd = layoutElement.y + layoutElement.h;
    if (requiredRowCount < rowEnd) {
      requiredRowCount = rowEnd;
    }
  }
  return requiredRowCount;
}

export function isLastVerticalElement(layoutElement, rowCount) {
  return layoutElement.y + layoutElement.h === rowCount;
}

export function getTabIdByType(tab) {
  let foundTab = settingsTabs.find((t) => t.type === tab);
  return foundTab ? foundTab.tabId : 0;
}

export function getSidebarDataByTypeAndFilter(layers, areas, barType, filter) {
  if (barType === SidebarTypes.Layers) {
    return filterLayersByName(layers, filter);
  } else if (barType === SidebarTypes.Areas) {
    return filterAreasByName(areas, filter);
  }
}

export function filterLayersByName(layers, filter) {
  if (!filter) {
    return layers;
  }
  return layers.filter((l) =>
    l.geoLayer.name.toLowerCase().includes(filter.toLowerCase())
  );
}

export function filterAreasByName(areas, filter) {
  if (!filter) {
    return areas;
  }
  return areas.filter((a) =>
    a.geoArea.name.toLowerCase().includes(filter.toLowerCase())
  );
}

export function getMaxIdInList(list) {
  return list.length > 0 ? Math.max([...list]) : 0;
}

export function filterDataByName(data, filter) {
  if (!filter) {
    return data;
  }
  return data.filter((val) =>
    val.name.toLowerCase().includes(filter.toLowerCase())
  );
}
