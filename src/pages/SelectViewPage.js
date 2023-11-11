import React from "react";
import { useEffect, useRef, useState } from "react";

import Map from "ol/Map.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom } from "ol/control";
import { OSM } from "ol/source.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { Grid, Typography } from "@mui/material";
import { selectViewSubtitle, selectViewTitle } from "../utils/data";
import SelectViewSidebar from "../components/SelectViewSidebar";
import { points } from "../data/mockData";

const SelectViewPage = () => {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});

  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);

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

  return (
    <div>
      <Grid container spacing={2} marginTop={1} marginBottom={1}>
        <Grid item xs={3}>
          <SelectViewSidebar points={points} />
        </Grid>
        <Grid item xs={9} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h2">{selectViewSubtitle}</Typography>
          </Grid>
          <Grid item>
            <div
              ref={mapTargetElement}
              className="map"
              style={{
                width: "100%",
                height: 800,
                position: "relative",
              }}
            ></div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectViewPage;
