import { useEffect, useRef, useState } from "react";
import "./index.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom } from "ol/control";
import VectorLayer from "ol/layer/Vector";
import { geoJsonLayer, styles } from "./data/layerData";
import GeoJSON from "ol/format/GeoJSON.js";
import { removeLayersWithId } from "./utils/customFunctions";
import MainMenu from "./components/MainMenu";
import Sidebar from "./components/Sidebar";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./theme";

function App() {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});

  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);

  const [L1, setL1] = useState("Add");

  useEffect(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: [fullScreenControl, zoomControl],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 0,
        maxZoom: 28,
      }),
    });

    map.setTarget(mapTargetElement.current || "");
    setMap(map);
    return () => map.setTarget("");
  }, []);

  const lessZoom = (map) => {
    const view = map.getView();
    const currentZoom = view.getZoom();
    const newZoom = currentZoom - 0.5;
    view.setZoom(newZoom);
  };

  const zoom = (map) => {
    console.log("zoom");
    const view = map.getView();
    const currentZoom = view.getZoom();
    const newZoom = currentZoom + 1;
    view.setZoom(newZoom);
  };

  const increaseResolution = (map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution / 2;
    view.setResolution(newResolution);
  };

  const decreaseResolution = (map) => {
    const view = map.getView();
    const currentResolution = view.getResolution();
    const newResolution = currentResolution * 2;
    view.setResolution(newResolution);
  };

  const originalCenter = (map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [0, 0];
    view.setCenter(newCenter);
  };

  const changeCenter = (map) => {
    const view = map.getView();
    const currentCenter = view.getCenter();
    const newCenter = [-10725196.690349146, 5635012.033203788];
    view.setCenter(newCenter);
  };

  const handleL1 = (map) => {
    if (L1 === "Add") {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJsonLayer),
      });
      const vectorLayer1 = new VectorLayer({
        source: vectorSource,
        style: styles.geoJsonLayerStyle,
        name: "layer1",
      });

      map.addLayer(vectorLayer1);
      setL1("Remove");
    } else {
      removeLayer(map, "layer1");
      setL1("Add");
    }
  };

  const removeLayer = (map, layerName) => {
    removeLayersWithId(map, layerName);
  };

  function addLayerToMap(layer) {
    map.addLayer(layer);
  }

  function removeLayerFromMap(layer) {
    removeLayersWithId(map, layer.layerId);
  }

  return (
    <>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <MainMenu />
          <Grid container spacing={2} marginTop={1} marginBottom={1}>
            <Grid item xs={3}>
              <Sidebar
                map={map}
                addLayerToMap={addLayerToMap}
                removeLayerFromMap={removeLayerFromMap}
              />
            </Grid>
            <Grid item xs={9}>
              <div
                ref={mapTargetElement}
                className="map"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              ></div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    </>
  );
}

export default App;
