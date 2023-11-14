import * as React from "react";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import { Button, Collapse, Grid } from "@mui/material";
import AreaListItem from "./AreaListItem";

export default function AreaList({ areas }) {
  const [checked, setChecked] = React.useState([]);
  const [opened, setOpened] = React.useState([]);

  const handleToggle = (area) => () => {
    const currentIndex = checked.indexOf(area.areaId);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(area.areaId);
      newChecked = activateChildToggles(area, newChecked);
      setChecked(newChecked);
    } else {
      newChecked.splice(currentIndex, 1);
      newChecked = deactivateChildToggle(area, newChecked);
      setChecked(newChecked);
    }
  };

  function activateChildToggles(area, newChecked) {
    const subAreas = area.subAreas;
    for (let i = 0; i < subAreas.length; i++) {
      const subArea = subAreas[i];
      if (!newChecked.includes(subArea.areaId)) {
        newChecked.push(subArea.areaId);
      }
    }
    return newChecked;
  }

  function deactivateChildToggle(area, newChecked) {
    const subAreas = area.subAreas;
    for (let i = 0; i < subAreas.length; i++) {
      const subArea = subAreas[i];
      const currentIndex = newChecked.indexOf(subArea.areaId);
      if (currentIndex !== -1) {
        newChecked.splice(currentIndex, 1);
      }
    }
    return newChecked;
  }

  const handleExpandCollapse = (area) => () => {
    const currentIndex = opened.indexOf(area.areaId);
    const newOpened = [...opened];

    if (currentIndex === -1) {
      newOpened.push(area.areaId);
    } else {
      newOpened.splice(currentIndex, 1);
    }

    setOpened(newOpened);
  };

  function isAreaChecked(area) {
    return checked.indexOf(area.areaId) !== -1;
  }

  function isAreaOpened(area) {
    return opened.indexOf(area.areaId) !== -1;
  }

  function getAreaItem(area, level) {
    if (area.subAreas.length === 0) {
      return (
        <AreaListItem
          area={area}
          hierarchyLevel={level}
          isExpandable={false}
          handleToggle={handleToggle}
          handleExpandCollapse={handleExpandCollapse}
          isChecked={isAreaChecked}
          isOpened={isAreaOpened}
        />
      );
    } else {
      return (
        <div>
          <AreaListItem
            area={area}
            hierarchyLevel={level}
            isExpandable={true}
            handleToggle={handleToggle}
            handleExpandCollapse={handleExpandCollapse}
            isChecked={isAreaChecked}
            isOpened={isAreaOpened}
          />
          <Collapse
            in={opened.indexOf(area.areaId) !== -1}
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

  return (
    <div>
      <Grid container marginY={1} spacing={1} paddingX={1}>
        <Grid item xs={6}>
          <Button variant="outlined" color="sideGreen" size="small" fullWidth>
            {"Create area set"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="sideGreen" size="small" fullWidth>
            {"Choose area set"}
          </Button>
        </Grid>
      </Grid>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {areas.map((area) => getAreaItem(area, 0))}
      </List>
    </div>
  );
}

AreaList.propTypes = {
  areas: PropTypes.array,
};
