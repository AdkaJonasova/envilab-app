import { useState } from "react";
import { fromLonLat, get } from "ol/proj";
import ReactMap from "./ReactMap";
import { OSM } from "ol/source";
import ReactTileLayer from "./layers/ReactTileLayer";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactLayers from "./layers/ReactLayers";
import { createLayerByType } from "../../utils/decisionCriteriaHandlers";
import ReactAreas from "./areas/ReactAreas";
import GeoJsonReactArea from "./areas/ReactArea";
// import { dataFolder } from "../../utils/data";

const LayerViewMap = ({ layers, areas, height, marginBottom }) => {
  // const path = require("path");
  const [center, setCenter] = useState([0, 0]);

  return (
    <div>
      <ReactMap
        center={fromLonLat(center)}
        height={height}
        marginBottom={marginBottom}
      >
        <ReactLayers>
          <ReactTileLayer source={new OSM()} zIndex={0} />
          {layers
            .filter((layer) => layer.isActive)
            .map((layer) => createLayerByType(layer))}
        </ReactLayers>
        <ReactAreas>
          {areas
            .filter((area) => area.isActive)
            .map((area) => {
              return <GeoJsonReactArea areaSource={area.geoArea.source} />;
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
