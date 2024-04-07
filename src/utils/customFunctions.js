import { SidebarTypes } from "./enums";
import {
  betweenElementsMargin,
  mainMenuHeight,
  pageBottomMargin,
  pageTopMargin,
  selectViewHeaderHeight,
  selectViewHeaderPadding,
  settingsTabs,
} from "./data";

export function getRowHeight(windowHeight, rowCount) {
  const windowLayoutPart =
    windowHeight - mainMenuHeight - pageBottomMargin - pageTopMargin;
  return windowLayoutPart / rowCount;
}

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

export function getElementHeight(layoutElement, rowCount, rowHeight) {
  const isLast = isLastVerticalElement(layoutElement, rowCount);
  return isLast
    ? layoutElement.h * rowHeight
    : layoutElement.h * rowHeight - betweenElementsMargin;
}

export function getElementBottomMargin(layoutElement, rowCount) {
  const isLast = isLastVerticalElement(layoutElement, rowCount);
  return isLast ? 0 : betweenElementsMargin;
}

function isLastVerticalElement(layoutElement, rowCount) {
  return layoutElement.y + layoutElement.h === rowCount;
}

export function getSelectViewMapHeight(windowHeight) {
  let windowWithoutMenuAndMargins =
    windowHeight - mainMenuHeight - pageBottomMargin - pageTopMargin;
  let windowWithoutBox =
    windowWithoutMenuAndMargins -
    selectViewHeaderHeight -
    2 * selectViewHeaderPadding;
  return windowWithoutBox;
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
  let result = [];
  for (let i = 0; i < layers.length; i++) {
    const layerGroup = { ...layers[i] };
    const filteredLayers = layerGroup.layers.filter((layer) =>
      layer.title.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredLayers.length > 0) {
      layerGroup.layers = filteredLayers;
      result.push(layerGroup);
    }
  }
  return result;
}

export function filterAreasByName(areas, filter) {
  if (!filter) {
    return areas;
  }
  let filteredAreas = [];
  areas.forEach((area) => {
    if (area.geoArea.name.toLowerCase().includes(filter.toLowerCase())) {
      filteredAreas.push(area);
    } else if (area.geoArea.subAreas.length > 0) {
      const filteredSubAreas = filterAreasByName(area.geoArea.subAreas, filter);
      filteredAreas = filteredAreas.concat(filteredSubAreas);
    }
  });
  return filteredAreas;
}

export function getZoomedToAreas(areas) {
  let zoomedAreas = [];
  areas.forEach((area) => {
    if (area.isActive) {
      zoomedAreas.push(area);
    }
    if (area.geoArea.subAreas.length > 0) {
      const zoomedToSubAreas = getZoomedToAreas(area.geoArea.subAreas);
      zoomedAreas = zoomedAreas.concat(zoomedToSubAreas);
    }
  });
  return zoomedAreas;
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
