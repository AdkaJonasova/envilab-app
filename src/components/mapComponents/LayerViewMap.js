import { useEffect, useState } from "react";
import { fromLonLat } from "ol/proj";
import ReactMap from "./ReactMap";
import { OSM } from "ol/source";
import ReactTileLayer from "./layers/ReactTileLayer";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactLayers from "./layers/ReactLayers";
import { createLayerByType } from "../../utils/decisionCriteriaHandlers";
import ReactAreas from "./areas/ReactAreas";
import GeoJsonReactArea from "./areas/GeoJsonReactArea";

const LayerViewMap = ({ layers, areas, height, marginBottom }) => {
  const [center, setCenter] = useState([0, 0]);
  const [flattenedAreas, setFlattenedAreas] = useState([]);
  const [flattenedLayers, setFlattenedLayers] = useState([]);

  useEffect(() => {
    if (layers && areas) {
      setFlattenedAreas(flattenAreas(areas));
      setFlattenedLayers(flattenLayers(layers));
    }
  }, []);

  const flattenAreas = (areas) => {
    let flattened = [];

    areas.forEach((area) => {
      flattened.push(area);
      if (area.geoArea.subAreas.length > 0) {
        flattened = flattened.concat(flattenAreas(area.geoArea.subAreas));
      }
    });
    return flattened;
  };

  const flattenLayers = (layers) => {
    let flattened = [];

    layers.forEach((layerGroup) => {
      layerGroup.layers.forEach((layer) => {
        flattened.push(layer);
      });
    });

    return flattened;
  };

  return (
    <div>
      <ReactMap
        center={fromLonLat(center)}
        height={height}
        marginBottom={marginBottom}
      >
        <ReactLayers>
          <ReactTileLayer source={new OSM()} zIndex={0} />
          {flattenedLayers
            .filter((layer) => layer.isActive)
            .map((layer) => createLayerByType(layer))}
        </ReactLayers>
        <ReactAreas>
          {flattenedAreas
            .filter((area) => area.isActive)
            .map((area) => {
              return (
                <GeoJsonReactArea
                  key={`map-area-${area.areaId}`}
                  areaSource={area.geoArea.source}
                  areaSourceId={area.geoArea.sourceId}
                />
              );
            })}
        </ReactAreas>
        <ReactControls>
          <ReactFullScreenControl />
          <ReactZoomControl />
        </ReactControls>
      </ReactMap>
    </div>
  );
};

export default LayerViewMap;
