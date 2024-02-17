import * as React from "react";
import List from "@mui/material/List";
import { Button, Collapse, Grid, Typography } from "@mui/material";
import AreaListItem from "./AreaListItem";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function AreaList({ areas }) {
  const [usedAreas, setUsedAreas] = React.useState([]);
  const [expandedAreas, setExpandedAreas] = React.useState([]);

  const { t } = useTranslation();

  //#region Methods
  const handleUseArea = (area) => () => {
    const currentIndex = usedAreas.indexOf(area.areaId);
    let newUsedAreas = [...usedAreas];

    if (currentIndex === -1) {
      newUsedAreas.push(area.areaId);
      newUsedAreas = activateSubAreas(area, newUsedAreas);
      setUsedAreas(newUsedAreas);
    } else {
      newUsedAreas.splice(currentIndex, 1);
      newUsedAreas = deactivateSubAreas(area, newUsedAreas);
      setUsedAreas(newUsedAreas);
    }
  };

  function activateSubAreas(area, newUsedAreas) {
    const subAreas = area.subAreas;
    for (let i = 0; i < subAreas.length; i++) {
      const subArea = subAreas[i];
      if (!newUsedAreas.includes(subArea.areaId)) {
        newUsedAreas.push(subArea.areaId);
      }
    }
    return newUsedAreas;
  }

  function deactivateSubAreas(area, newUsedAreas) {
    const subAreas = area.subAreas;
    for (let i = 0; i < subAreas.length; i++) {
      const subArea = subAreas[i];
      const currentIndex = newUsedAreas.indexOf(subArea.areaId);
      if (currentIndex !== -1) {
        newUsedAreas.splice(currentIndex, 1);
      }
    }
    return newUsedAreas;
  }

  const handleExpandCollapse = (area) => () => {
    const currentIndex = expandedAreas.indexOf(area.areaId);
    const newExpanded = [...expandedAreas];

    if (currentIndex === -1) {
      newExpanded.push(area.areaId);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpandedAreas(newExpanded);
  };

  function isAreaUsed(area) {
    return usedAreas.indexOf(area.areaId) !== -1;
  }

  function isAreaExpanded(area) {
    return expandedAreas.indexOf(area.areaId) !== -1;
  }

  function getAreaItem(area, level) {
    if (area.subAreas.length === 0) {
      return (
        <AreaListItem
          area={area}
          hierarchyLevel={level}
          isExpandable={false}
          handleUseArea={handleUseArea}
          handleExpandCollapse={handleExpandCollapse}
          isUsed={isAreaUsed}
          isExpanded={isAreaExpanded}
        />
      );
    } else {
      return (
        <div>
          <AreaListItem
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            handleUseArea={handleUseArea}
            handleExpandCollapse={handleExpandCollapse}
            isUsed={isAreaUsed}
            isExpanded={isAreaExpanded}
          />
          <Collapse
            in={expandedAreas.indexOf(area.areaId) !== -1}
            timeout={"auto"}
            unmountOnExit
          >
            <List disablePadding>
              {area.subAreas.map((subArea) => getAreaItem(subArea, level + 1))}
            </List>
          </Collapse>
        </div>
      );
    }
  }

  function getEmptyListText() {
    return (
      <Typography variant="body2">
        {t("layerViewSidebar.areaList.noAreas")}
      </Typography>
    );
  }
  //#endregion

  return (
    <div>
      <Grid container marginY={1} spacing={1} paddingX={1}>
        <Grid item xs={6}>
          <Button variant="outlined" color="sideGreen" size="small" fullWidth>
            {t("layerViewSidebar.areaList.createSet")}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="sideGreen" size="small" fullWidth>
            {t("layerViewSidebar.areaList.chooseSet")}
          </Button>
        </Grid>
      </Grid>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {areas.length === 0
          ? getEmptyListText()
          : areas.map((area) => getAreaItem(area, 0))}
      </List>
    </div>
  );
}

AreaList.propTypes = {
  areas: PropTypes.array,
};
