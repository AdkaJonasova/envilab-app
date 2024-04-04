// This code was sourced from: https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 and modified is necessary

import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import TileLayer from "ol/layer/Tile";

const ReactTileLayer = ({ source, name, id, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let transformedOpacity = opacity / 100;
    let tileLayer = new TileLayer({
      source: source,
      zIndex: zIndex,
      opacity: transformedOpacity,
      name: name,
      id: id,
    });
    map.addLayer(tileLayer);

    // map.on("singleclick", function (evt) {
    //   const viewResolution = map.getView().getResolution();
    //   console.log("Resolution: ", viewResolution);
    //   const source = tileLayer.getSource();
    //   console.log("Source", source);
    //   const url = source.getFeatureInfoUrl(
    //     evt.coordinate,
    //     viewResolution,
    //     "EPSG:3857",
    //     {
    //       INFO_FORMAT: "application/json",
    //     }
    //   );
    //   console.log("Url: ", url);
    //   if (url) {
    //     let data = fetch(url).then((response) => response.text());
    //     console.log("Data: ", data);
    //   }
    // });

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

export default ReactTileLayer;
