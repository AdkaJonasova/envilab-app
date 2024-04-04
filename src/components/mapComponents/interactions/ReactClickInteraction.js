import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";

const ReactClickInteraction = () => {
  const { map } = useContext(MapContext);

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

    let layers = map.getLayers().getArray().slice().reverse();
    const clickedLayer = layers.filter((layer) => {
      if (
        layer instanceof TileLayer &&
        layer.getVisible() &&
        layer.getSource() instanceof TileWMS
      ) {
        return true;
      }
      return false;
    });

    console.log("Clicked layers: ", clickedLayer);
    let layer = clickedLayer[0];
    console.log("Layer: ", layer);

    let properties = layer.getProperties();
    console.log("Properties: ", properties);

    let url = layer
      .getSource()
      .getFeatureInfoUrl(event.coordinate, viewResolution, viewProjection, {
        INFO_FORMAT: "application/json",
      });
    console.log("Url: ", url);

    fetch(url)
      .then((response) => {
        console.log("Response: ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return null;
};

export default ReactClickInteraction;
