import ReactMap from "./ReactMap";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactMouseControl from "./controls/ReactMouseControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactInteractions from "./interactions/ReactInteractions";
import ReactDrawInteraction from "./interactions/ReactDrawInteraction";
import ReactLayers from "./layers/ReactLayers";
import ReactTileLayer from "./layers/ReactTileLayer";
import { OSM, Vector } from "ol/source";
import { useSelector } from "react-redux";
import { selectFeatures } from "../../redux/slices/SelectViewSlice";
import ReactVectorLayer from "./layers/ReactVectorLayer";
import GeoJSON from "ol/format/GeoJSON.js";

const SelectViewMap = ({ height, marginBottom, drawType, handleDrawEnd }) => {
  const activeFeatures = useSelector(selectFeatures);

  const createVectorLayerFromFeatures = () => {
    if (activeFeatures.length > 0) {
      const geojsonObject = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:4326",
          },
        },
        features: activeFeatures,
      };
      const vectorSource = new Vector({
        features: new GeoJSON().readFeatures(geojsonObject),
      });

      return (
        <ReactVectorLayer
          source={vectorSource}
          opacity={100}
          id={"selectViewLayer"}
          name={"Select view layer"}
        />
      );
    }
  };

  return (
    <div>
      <ReactMap height={height} marginBottom={marginBottom}>
        <ReactLayers>
          <ReactTileLayer source={new OSM()} zIndex={0} />
          {createVectorLayerFromFeatures()}
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
