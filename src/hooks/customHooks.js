export const mergeLayers = (geoLayers, layerInfos, includeAll = false) => {
  let result = [];
  geoLayers.forEach((l) => {
    let layerInfo = layerInfos.find((li) => li.layerID === l.layerId);
    if (layerInfo || includeAll) {
      let layer = {
        layerId: l.layerId,
        isActive: layerInfo ? layerInfo.isActive : false,
        isFavorite: layerInfo ? layerInfo.isFavorite : false,
        geoLayer: l,
      };
      result.push(layer);
    }
  });
  return result;
};

const mergeArea = (geoserverArea, areaInfo) => {
  let mergedArea = {
    areaId: geoserverArea.areaId,
    isActive: areaInfo ? areaInfo.isActive : false,
    isFavorite: areaInfo ? areaInfo.isFavorite : false,
    isCustom: areaInfo ? areaInfo.isCustom : false,
    geoArea: { ...geoserverArea },
  };
  return mergedArea;
};

const hasSubAreas = (area) => {
  return area.subAreas.length !== 0;
};

export const mergeAreas = (geoAreas, areaInfos, includeAll = false) => {
  let mergedAreas = [];
  geoAreas.forEach((a) => {
    let areaInfo = areaInfos.find((ai) => ai.areaID === a.areaId);
    if (areaInfo || includeAll) {
      let area = mergeArea(a, areaInfo);
      if (hasSubAreas(a)) {
        area.geoArea.subAreas = mergeAreas(a.subAreas, areaInfos, includeAll);
      }
      mergedAreas.push(area);
    } else if (!areaInfo && hasSubAreas(a)) {
      mergeAreas.concat(mergeAreas(a.subAreas, areaInfos, includeAll));
    }
  });
  return mergedAreas;
};
