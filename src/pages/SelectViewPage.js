import React from "react";
import { useEffect, useRef, useState } from "react";

import Map from "ol/Map.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom, MousePosition } from "ol/control";
import { OSM } from "ol/source.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { Button, Grid, Typography } from "@mui/material";
import SelectViewSidebar from "../components/SelectViewSidebar";
import { createStringXY } from "ol/coordinate";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw.js";
import { toLonLat } from "ol/proj";
import { getMaxIdInList } from "../utils/customFunctions";
import { useTranslation } from "react-i18next";

const SelectViewPage = () => {
  const fullScreenControl = new FullScreenControl();
  const zoomControl = new Zoom({});
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: "EPSG:4326",
    className: "mouse-position",
  });

  const mapTargetElement = useRef();
  const [map, setMap] = useState(null);
  const [points, setPoints] = useState([]);
  const { t } = useTranslation();

  let drawSource;
  let draw;

  function onPointSelect(event) {
    const cords = toLonLat(event.coordinate);

    const strigifyFunc = createStringXY(4);
    const formatedCords = strigifyFunc(cords);
    const splitFormatedCords = formatedCords.split(",");

    const pointIds = points.map((p) => p.pointId);
    const point = {
      pointId: getMaxIdInList(pointIds),
      x: splitFormatedCords[0],
      y: splitFormatedCords[1],
    };
    setPoints((current) => [...current, point]);
  }

  function onPointDelete(event, point) {
    let currentIndex = points.indexOf(point);
    if (currentIndex !== -1) {
      let newPoints = [...points];
      newPoints.splice(currentIndex, 1);
      setPoints(newPoints);
    }
  }

  useEffect(() => {
    drawSource = new VectorSource({ wrapX: false });
    const vectorDrawLayer = new VectorLayer({ source: drawSource });
    const tileBaseLayer = new TileLayer({ source: new OSM() });

    const newMap = new Map({
      layers: [tileBaseLayer, vectorDrawLayer],
      controls: [fullScreenControl, zoomControl, mousePositionControl],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 0,
        maxZoom: 28,
      }),
    });

    draw = new Draw({
      source: drawSource,
      type: "Point",
    });
    newMap.addInteraction(draw);

    newMap.setTarget(mapTargetElement.current || "");
    newMap.on("click", (e) => onPointSelect(e));
    setMap(newMap);

    return () => newMap.setTarget("");
  }, []);

  return (
    <div>
      <Grid container spacing={2} marginTop={1} marginBottom={1}>
        <Grid item xs={3}>
          <SelectViewSidebar points={points} deletePoint={onPointDelete} />
        </Grid>
        <Grid item xs={9} container direction="column" spacing={1}>
          <Grid item container direction="row">
            <Grid item xs={10}>
              <Typography variant="annotation">
                {t("selectView.subtitle")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              containery
              justifyContent={"flex-end"}
              paddingX={2}
            >
              <Button
                fullWidth
                color="darkGreen"
                variant="outlined"
                size="small"
              >
                {t("selectView.importBtn")}
              </Button>
            </Grid>
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
