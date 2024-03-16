import ReactMap from "./ReactMap";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactMouseControl from "./controls/ReactMouseControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import { fromLonLat } from "ol/proj";
import ReactInteractions from "./interactions/ReactInteractions";
import ReactDrawInteraction from "./interactions/ReactDrawInteraction";
import { useState } from "react";
import ReactLayers from "./layers/ReactLayers";
import ReactTileLayer from "./layers/ReactTileLayer";
import { OSM } from "ol/source";

const SelectViewMap = ({ height, marginBottom, drawType, handleDrawEnd }) => {
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
        </ReactLayers>
        <ReactControls>
          <ReactFullScreenControl />
          <ReactZoomControl />
          <ReactMouseControl />
        </ReactControls>
        <ReactInteractions>
          <ReactDrawInteraction variant={drawType} onDrawEnd={handleDrawEnd} />
        </ReactInteractions>
      </ReactMap>
    </div>
  );
};

export default SelectViewMap;
