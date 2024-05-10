import ReactMap from "./ReactMap";
import { OSM } from "ol/source";
import ReactTileLayer from "./layers/ReactTileLayer";
import ReactControls from "./controls/ReactControls";
import ReactFullScreenControl from "./controls/ReactFullScreenControl";
import ReactZoomControl from "./controls/ReactZoomControl";
import ReactLayers from "./layers/ReactLayers";
import { createLayerByType } from "../../utils/decisionCriteriaHandlers";
import ReactAreas from "./areas/ReactAreas";
import ReactClickInteraction from "./interactions/ReactClickInteraction";
import ReactInteractions from "./interactions/ReactInteractions";
import { useSelector } from "react-redux";
import { selectActiveLayers } from "../../redux/slices/LayersSlice";
import { selectActiveAreas } from "../../redux/slices/AreasSlice";
import { selectMapInfo } from "../../redux/slices/LayoutSlice";
import ReactArea from "./areas/ReactArea";

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
          {layers.map((layer) => createLayerByType(layer))}
        </ReactLayers>
        <ReactAreas>
          {areas.map((area) => {
            return <ReactArea key={`map-area-${area.name}`} area={area} />;
          })}
        </ReactAreas>
        <ReactControls>
          <ReactFullScreenControl />
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
