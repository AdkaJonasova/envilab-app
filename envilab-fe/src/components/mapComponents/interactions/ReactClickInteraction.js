import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import MapContext from "../MapContext";
import {
  addDetailedData,
  openDetailedPopup,
  selectLayer,
} from "../../../redux/slices/DetailedDataSlice";

const ReactClickInteraction = () => {
  const { map } = useContext(MapContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map) return;

    map.on("singleclick", handleMapClick);

    return () => {
      map.un("singleclick", handleMapClick);
    };
  }, [map]);

  const handleMapClick = (event) => {
    let viewResolution = map.getView().getResolution();
    let viewProjection = map.getView().getProjection();

    const layers = map.getLayers().getArray();
    const infoLayers = layers.filter(
      (layer) =>
        layer instanceof TileLayer &&
        layer.getVisible() &&
        layer.getSource() instanceof TileWMS
    );

    let shouldSelectLayer = true;
    infoLayers.forEach((layer) => {
      const layerProperties = layer.getProperties();
      let url = layer
        .getSource()
        .getFeatureInfoUrl(event.coordinate, viewResolution, viewProjection, {
          info_format: "application/json",
        });
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const features = data.features;
          if (features.length > 0) {
            const layerData = features[0].properties;
            dispatch(
              addDetailedData({
                identificator: layerProperties.id,
                title: layerProperties.name,
                data: layerData,
              })
            );
            if (shouldSelectLayer) {
              dispatch(selectLayer({ identificator: layerProperties.id }));
              shouldSelectLayer = false;
            }
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    });
    dispatch(openDetailedPopup());
  };

  return null;
};

export default ReactClickInteraction;
