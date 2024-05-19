import { settingsTabs } from "./data";

//#region Layers

export function filterLayersByTitle(layerGroups, filter) {
  if (!filter) {
    return layerGroups;
  }
  let result = [];
  layerGroups.forEach((group) => {
    const newGroup = { ...group };
    const filteredLayers = newGroup.layers.filter((layer) =>
      layer.title.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredLayers.length > 0) {
      newGroup.layers = filteredLayers;
      result.push(newGroup);
    }
  });
  return result;
}

export function filterFavoriteLayersByTitle(layerGroups, filter) {
  if (!filter) {
    return getFavoriteLayers(layerGroups);
  }
  let result = [];
  layerGroups.forEach((group) => {
    const newGroup = { ...group };
    const filteredFavoriteLayers = newGroup.layers.filter(
      (layer) =>
        layer.title.toLowerCase().includes(filter.toLowerCase()) &&
        layer.isFavorite
    );
    if (filteredFavoriteLayers.length > 0) {
      newGroup.layers = filteredFavoriteLayers;
      result.push(newGroup);
    }
  });
  return result;
}

export function getFavoriteLayers(layerGroups) {
  let result = [];
  layerGroups.forEach((group) => {
    const newGroup = { ...group };
    const favoriteLayers = newGroup.layers.filter((layer) => layer.isFavorite);
    if (favoriteLayers.length > 0) {
      newGroup.layers = favoriteLayers;
      result.push(newGroup);
    }
  });
  return result;
}

export function getActiveLayers(layerGroups) {
  let result = [];

  layerGroups.forEach((group) => {
    group.layers
      .filter((layer) => layer.isActive)
      .forEach((layer) => {
        result.push(layer);
      });
  });

  return result;
}

//#endregion

//#region Areas

export function filterAreasByTitle(areas, filter) {
  if (!filter) {
    return areas;
  }
  let result = [];
  areas.forEach((area) => {
    if (area.title.toLowerCase().includes(filter.toLowerCase())) {
      result.push(area);
    } else if (area.subAreas.length > 0) {
      const filteredSubAreas = filterAreasByTitle(area.subAreas, filter);
      result = result.concat(filteredSubAreas);
    }
  });
  return result;
}

export function filterFavoriteAreasByTitle(
  areas,
  filter,
  parentTitleMatches = false
) {
  if (!filter) {
    return getFavoriteAreas(areas);
  }

  let result = [];
  areas.forEach((area) => {
    let copiedArea = { ...area };
    let titleMatches = false;

    // Check whether the area or one of the parent areas matches the filter.
    if (
      copiedArea.title.toLowerCase().includes(filter.toLowerCase()) ||
      parentTitleMatches
    ) {
      titleMatches = true;
    }

    // Process sub areas
    if (copiedArea.subAreas.length > 0) {
      copiedArea.subAreas = filterFavoriteAreasByTitle(
        copiedArea.subAreas,
        filter,
        titleMatches
      );
    }

    // Add to result - if the area is favorite and title matches the filter or if has any subareas
    if (copiedArea.isFavorite && titleMatches) {
      result.push(copiedArea);
    } else if (copiedArea.subAreas.length > 0) {
      result = result.concat(copiedArea.subAreas);
    }
  });
  return result;
}

export function getActiveAreas(areas) {
  let result = [];
  areas.forEach((area) => {
    if (area.isActive) {
      result.push(area);
    }
    if (area.subAreas.length > 0) {
      const zoomedToSubAreas = getActiveAreas(area.subAreas);
      result = result.concat(zoomedToSubAreas);
    }
  });
  return result;
}

export function getFavoriteAreas(areas) {
  let result = [];
  areas.forEach((area) => {
    let copiedArea = { ...area };

    if (copiedArea.subAreas.length > 0) {
      copiedArea.subAreas = getFavoriteAreas(copiedArea.subAreas);
    }

    if (copiedArea.isFavorite) {
      result.push(copiedArea);
    } else if (copiedArea.subAreas.length > 0) {
      result = result.concat(copiedArea.subAreas);
    }
  });
  return result;
}
//#endregion

//#region Tabs

export function getTabIdByType(tab) {
  let foundTab = settingsTabs.find((t) => t.type === tab);
  return foundTab ? foundTab.tabId : 0;
}

//#endregion
