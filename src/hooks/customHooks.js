export const mergeLayers = (geoLayers, layerInfos, includeAll = false) => {
  let result = [];
  geoLayers.forEach((l) => {
    let layerInfo = layerInfos.find((li) => li.layerID === l.layerId);
    if (layerInfo || !includeAll) {
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

export const mergeAreas = (geoAreas, areaInfos, includeAll = false) => {
  let result = [];
  geoAreas.forEach((a) => {
    let areaInfo = areaInfos.find((ai) => ai.areaID === a.areaId);
    if (areaInfo || !includeAll) {
      let area = {
        areaId: a.areaId,
        isActive: areaInfo ? areaInfo.isActive : false,
        isFavorite: areaInfo ? areaInfo.isFavorite : false,
        isCustom: areaInfo ? areaInfo.isCustom : false,
        geoArea: a,
      };
      result.push(area);
    }
  });
  return result;
};
