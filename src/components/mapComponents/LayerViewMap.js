import { useState } from "react";
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
import ReactClickInteraction from "./interactions/ReactClickInteraction";
import ReactInteractions from "./interactions/ReactInteractions";
import { useSelector } from "react-redux";
import { selectActiveLayers } from "../../redux/slices/LayersSlice";
import { selectActiveAreas } from "../../redux/slices/AreasSlice";
import { selectMapInfo } from "../../redux/slices/LayoutSlice";

const LayerViewMap = () => {
  const layers = useSelector((state) => selectActiveLayers(state));
  const areas = useSelector((state) => selectActiveAreas(state));
  const layoutInfo = useSelector(selectMapInfo);

  const [center, setCenter] = useState([0, 0]);

  return (
    <div>
      <ReactMap
        center={fromLonLat(center)}
        height={layoutInfo.height}
        marginBottom={layoutInfo.bottomMargin}
      >
        <ReactLayers>
          <ReactTileLayer source={new OSM()} zIndex={0} />
          {layers.map((layer) => createLayerByType(layer))}
        </ReactLayers>
        <ReactAreas>
          {areas.map((area) => {
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
        <ReactInteractions>
          <ReactClickInteraction />
        </ReactInteractions>
      </ReactMap>
    </div>
  );
};

export default LayerViewMap;
