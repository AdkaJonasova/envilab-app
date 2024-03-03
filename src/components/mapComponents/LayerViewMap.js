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

const LayerViewMap = ({ layers, height, marginBottom }) => {
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
        <ReactControls>
          <ReactFullScreenControl />
          <ReactZoomControl />
        </ReactControls>
      </ReactMap>
    </div>
  );
};

export default LayerViewMap;
