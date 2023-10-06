import { useEffect, useRef, useState } from "react";
import "./index.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom } from "ol/control";
import VectorLayer from "ol/layer/Vector";
import {
  earthquakesGeojson,
  geoJsonLayer,
  geojsonExample2,
  styles,
} from "./data/layerData";
import GeoJSON from "ol/format/GeoJSON.js";
import { removeLayersWithName } from "./utils/customFunctions";
import TileWMS from "ol/source/TileWMS.js";
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
  const [L2, setL2] = useState("Add");
  const [L3, setL3] = useState("Add");
  const [L4, setL4] = useState("Add");

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

  const handleL2 = (map) => {
    if (L2 === "Add") {
      var layer = new VectorLayer({
        source: new VectorSource({
          url: earthquakesGeojson,
          format: new GeoJSON(),
        }),
        name: "layer2",
      });
      map.addLayer(layer);
      setL2("Remove");
    } else {
      removeLayer(map, "layer2");
      setL2("Add");
    }
  };

  const handleL3 = (map) => {
    if (L3 === "Add") {
      var l = new TileLayer({
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: "https://ahocevar.com/geoserver/wms",
          params: { LAYERS: "topp:states", TILED: true },
          serverType: "geoserver",
          // Countries have transparency, so do not fade tiles:
          transition: 0,
        }),
        name: "layer3",
      });
      map.addLayer(l);
      setL3("Remove");
    } else {
      removeLayer(map, "layer3");
      setL3("Add");
    }
  };

  const handleL4 = (map) => {
    if (L4 === "Add") {
      var layer = new VectorLayer({
        source: new VectorSource({
          url: geojsonExample2,
          format: new GeoJSON(),
        }),
        name: "layer4",
      });
      map.addLayer(layer);
      setL4("Remove");
    } else {
      removeLayer(map, "layer4");
      setL4("Add");
    }
  };

  const removeLayer = (map, layerName) => {
    removeLayersWithName(map, layerName);
  };

  return (
    <>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <MainMenu />
          <Grid container spacing={2} marginTop={1} marginBottom={1}>
            <Grid item xs={3}>
              <Sidebar />
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

      {/* <button onClick={() => lessZoom(map)}>lessZoom</button>
      <button onClick={() => zoom(map)}>zoom</button>
      <button onClick={() => increaseResolution(map)}>increaseResolution</button>
      <button onClick={() => decreaseResolution(map)}>decreaseResolution</button>
      <button onClick={() => changeCenter(map)}>changeCenter</button>
      <button onClick={() => originalCenter(map)}>originalCenter</button>

      <br />
      <button onClick={() => handleL1(map)}>{L1 + " basic"}</button>
      <button onClick={() => handleL2(map)}>{L2 + " point"}</button>
      <button onClick={() => handleL3(map)}>{L3 + " geo"}</button>
      <button onClick={() => handleL4(map)}>{L4 + " veg"}</button>

      <div
        ref={mapTargetElement}
        className="map"
        style={{
          alignSelf: "flex-end",
          width: "75%",
          height: "500px",
          position: "relative",
        }} >

      </div> */}
    </>
  );
}

export default App;
