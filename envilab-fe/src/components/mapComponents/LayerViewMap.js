import { useSelector } from "react-redux";
import { OSM } from "ol/source";
import ReactMap from "./ReactMap";
import ReactTileLayer from "./layers/ReactTileLayer";
import ReactControls from "./controls/ReactControls";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactLayers from "./layers/ReactLayers";
import ReactAreas from "./areas/ReactAreas";
import ReactArea from "./areas/ReactArea";
import ReactClickInteraction from "./interactions/ReactClickInteraction";
import ReactInteractions from "./interactions/ReactInteractions";
import { selectActiveLayers } from "../../redux/slices/LayersSlice";
import { selectActiveAreas } from "../../redux/slices/AreasSlice";
import { selectMapInfo } from "../../redux/slices/LayoutSlice";
import { createTileLayer } from "../../utils/mapFunctions";

const LayerViewMap = () => {
  const layers = useSelector((state) => selectActiveLayers(state));
  const areas = useSelector((state) => selectActiveAreas(state));
  const layoutInfo = useSelector(selectMapInfo);

  return (
    <div>
      <ReactMap
        height={layoutInfo.height}
        marginBottom={layoutInfo.bottomMargin}
      >
        <ReactLayers>
          <ReactTileLayer
            key={`map-base-layer`}
            source={new OSM()}
            zIndex={0}
          />
          {layers.map((layer) => createTileLayer(layer))}
        </ReactLayers>
        <ReactAreas>
          {areas.map((area) => {
            return <ReactArea key={`map-area-${area.name}`} area={area} />;
          })}
        </ReactAreas>
        <ReactControls>
          <ReactZoomControl />
        </ReactControls>
        <ReactInteractions>
          <ReactClickInteraction />
        </ReactInteractions>
      </ReactMap>
    </div>
  );
};

export default LayerViewMap;
