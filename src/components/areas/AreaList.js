import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import { Collapse, Divider, IconButton } from "@mui/material";
import { Edit, ExpandLess, ExpandMore } from "@mui/icons-material";

export default function AreaList({ areas }) {
  const [checked, setChecked] = React.useState([]);
  const [opened, setOpened] = React.useState([]);

  const handleToggle = (area) => () => {
    const currentIndex = checked.indexOf(area.areaId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(area.areaId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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

  function addEditButton(isEditable) {
    if (isEditable) {
      return (
        <IconButton size="small" color="sideBrown">
          <Edit />
        </IconButton>
      );
    }
    return null;
  }

  function addExpandCollapseItem(area) {
    return (
      <IconButton size="small" onClick={handleExpandCollapse(area)}>
        {opened.indexOf(area.areaId) !== -1 ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    );
  }

  function getAreaItem(area, level) {
    let paddingSize = level * 2;
    let paddingSizeBigger = level * 2 + 4;

    if (area.subAreas.length === 0) {
      return (
        <div>
          <ListItem
            id={`switch-list-item-${area.areaId}`}
            sx={{ pl: paddingSizeBigger }}
          >
            <ListItemText
              id={`switch-list-text-label-${area.areaId}`}
              primary={area.name}
            />
            {addEditButton(area.isEditable)}
            <Switch
              edge="end"
              size="small"
              color="sideBrown"
              onChange={handleToggle(area)}
              checked={checked.indexOf(area.areaId) !== -1}
            />
          </ListItem>
          <Divider />
        </div>
      );
    } else {
      return (
        <div>
          <ListItem
            sx={{ pl: paddingSize }}
            id={`switch-list-item-${area.areaId}`}
          >
            {addExpandCollapseItem(area)}
            <ListItemText
              id={`switch-list-text-label-${area.areaId}`}
              primary={area.name}
            />
            {addEditButton(area.isEditable)}
            <Switch
              edge="end"
              size="small"
              color="sideBrown"
              onChange={handleToggle(area)}
              checked={checked.indexOf(area.areaId) !== -1}
            />
          </ListItem>
          <Divider />
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
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {areas.map((area) => getAreaItem(area, 0))}
    </List>
  );
}

AreaList.propTypes = {
  areas: PropTypes.array,
};
