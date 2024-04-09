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
//#endregion
