import React from "react";
import { useEffect, useRef, useState } from "react";

import Map from "ol/Map.js";
import FullScreenControl from "ol/control/FullScreen";
import { Zoom, MousePosition } from "ol/control";
import { OSM } from "ol/source.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import SelectViewSidebar from "../components/SelectViewSidebar";
import { createStringXY } from "ol/coordinate";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw.js";
import { toLonLat } from "ol/proj";
import { getMaxIdInList } from "../utils/customFunctions";
import { useTranslation } from "react-i18next";
import SelectViewMap from "../components/mapComponents/SelectViewMap";
import { betweenElementsMargin, drawOptions } from "../utils/data";
import DrawInteractionSelect from "../components/selectView/DrawIteractionSelect";

const SelectViewPage = () => {
  const [points, setPoints] = useState([]);
  const [drawType, setDrawType] = useState(drawOptions[0].code);
  const { t } = useTranslation();

  // function onPointSelect(event) {
  //   const cords = toLonLat(event.coordinate);

  //   const strigifyFunc = createStringXY(4);
  //   const formatedCords = strigifyFunc(cords);
  //   const splitFormatedCords = formatedCords.split(",");

  //   const pointIds = points.map((p) => p.pointId);
  //   const point = {
  //     pointId: getMaxIdInList(pointIds),
  //     x: splitFormatedCords[0],
  //     y: splitFormatedCords[1],
  //   };
  //   setPoints((current) => [...current, point]);
  // }

  // function onPointDelete(event, point) {
  //   let currentIndex = points.indexOf(point);
  //   if (currentIndex !== -1) {
  //     let newPoints = [...points];
  //     newPoints.splice(currentIndex, 1);
  //     setPoints(newPoints);
  //   }
  // }

  const handleDrawTypeChange = (event) => {
    const newValue = event.target.value;
    setDrawType(newValue);
  };

  const handleDrawEnd = (feature) => {
    console.log(feature);
  };

  return (
    <div>
      <Grid container spacing={2} marginTop={1} marginBottom={1}>
        <Grid item xs={3}>
          <SelectViewSidebar points={points} />
        </Grid>
        <Grid item xs={9} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="annotation">
              {t("selectView.subtitle")}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems={"center"}
            spacing={1}
          >
            <Grid item xs={4}>
              <DrawInteractionSelect
                drawInteractionType={drawType}
                onDrawTypeChange={handleDrawTypeChange}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid
              item
              xs={2}
              container
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
            <SelectViewMap
              height={800}
              marginBottom={betweenElementsMargin}
              drawType={drawType}
              handleDrawEnd={handleDrawEnd}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectViewPage;
