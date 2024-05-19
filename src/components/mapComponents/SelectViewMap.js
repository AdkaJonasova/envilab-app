import { OSM } from "ol/source";
import ReactMap from "./ReactMap";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactMouseControl from "./controls/ReactMouseControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactInteractions from "./interactions/ReactInteractions";
import ReactDrawInteraction from "./interactions/ReactDrawInteraction";
import ReactLayers from "./layers/ReactLayers";
import ReactTileLayer from "./layers/ReactTileLayer";

const SelectViewMap = ({ height, marginBottom, drawType }) => {
  return (
    <div>
      <ReactMap height={height} marginBottom={marginBottom}>
        <ReactLayers>
          <ReactTileLayer source={new OSM()} zIndex={0} />
        </ReactLayers>
        <ReactControls>
          <ReactFullScreenControl />
          <ReactZoomControl />
          <ReactMouseControl />
        </ReactControls>
        <ReactInteractions>
          <ReactDrawInteraction variant={drawType} />
        </ReactInteractions>
      </ReactMap>
    </div>
  );
};

export default SelectViewMap;
