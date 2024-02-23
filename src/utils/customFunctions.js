import { LayerTypes, SidebarTypes } from "./enums";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source.js";
import GeoJSON from "ol/format/GeoJSON.js";
import TileLayer from "ol/layer/Tile.js";
import TileWMS from "ol/source/TileWMS.js";
import { settingsTabs } from "./data";
import ReactVectorLayer from "../components/mapComponents/layers/ReactVectorLayer";
import ReactTileLayer from "../components/mapComponents/layers/ReactTileLayer";

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

export function removeLayersWithId(map, layerId) {
  map
    .getLayers()
    .getArray()
    .filter((layer) => layer.get("id") === layerId)
    .forEach((layer) => map.removeLayer(layer));
}

export function filterDataByName(data, filter) {
  if (!filter) {
    return data;
  }
  return data.filter((val) =>
    val.name.toLowerCase().includes(filter.toLowerCase())
  );
}

export function createLayerByType(layer) {
  if (layer.geoLayer.type === LayerTypes.Vector) {
    return (
      <ReactVectorLayer
        source={
          new VectorSource({
            url: layer.geoLayer.source,
            format: new GeoJSON(),
          })
        }
        name={layer.geoLayer.name}
        id={layer.layerId}
      />
    );
  } else if (layer.geoLayer.type === LayerTypes.Tile) {
    return (
      <ReactTileLayer
        source={
          new TileWMS({
            url: layer.geoLayer.source,
            params: { LAYERS: "topp:states", TILED: true },
            serverType: "geoserver",
            transition: 0,
          })
        }
        name={layer.geoLayer.name}
        id={layer.layerId}
      />
    );
  }
}
