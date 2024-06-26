import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Delete,
  ExpandLess,
  ExpandMore,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { deleteCustomArea } from "../../hooks/areaHooks";
import { userId } from "../../data/mockData";
import { deleteArea } from "../../redux/slices/AreasSlice";

const AreaListItem = ({
  area,
  hierarchyLevel,
  isExpandable,
  handleZoomToArea,
  handleUnzoomArea,
  handleExpandCollapse,
  isExpanded,
}) => {
  let paddingSize = isExpandable ? hierarchyLevel * 2 : hierarchyLevel * 2 + 4;

  const [confirmDialogOpened, setConfirmDialogOpened] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  //#region Methods

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpened(true);
  };

  const handleConfirmDialogNo = () => {
    setConfirmDialogOpened(false);
  };

  const handleConfirmDialogYes = () => {
    deleteCustomArea(userId, area.name)
      .then((r) => {
        if (r.data) {
          dispatch(deleteArea({ areaName: area.name }));
          setConfirmDialogOpened(false);
        } else {
          setConfirmDialogOpened(false);
          setErrorSnackbarOpen(true);
        }
      })
      .catch((_e) => {
        setConfirmDialogOpened(false);
        setErrorSnackbarOpen(true);
      });
  };

  const addUnzoomArea = (area) => {
    if (area.isActive) {
      return (
        <Tooltip title={t("layerViewSidebar.areaList.zoomOutTooltip")}>
          <IconButton
            key={`area-list-item-unzoom-${area.name}`}
            size="small"
            color="beigeBrown"
            onClick={() => handleUnzoomArea(area)}
          >
            <ZoomOut />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  const addExpandCollapseItem = (area) => {
    let isAreaExpanded = isExpanded(area);
    return (
      <Tooltip
        title={
          isAreaExpanded
            ? t("layerViewSidebar.areaList.collapseTooltip")
            : t("layerViewSidebar.areaList.expandTooltip")
        }
      >
        <IconButton
          key={`area-list-item-expand-${area.name}`}
          size="small"
          onClick={() => handleExpandCollapse(area)}
        >
          {isExpanded(area) ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Tooltip>
    );
  };

  const addAreaCustomIcon = (area) => {
    if (area.isCustom) {
      return (
        <Tooltip title={t("layerViewSidebar.areaList.customTooltip")}>
          <LockPersonIcon color="darkGreen" />
        </Tooltip>
      );
    }
  };

  const addAreaDeleteIcon = (area) => {
    if (area.isCustom) {
      return (
        <Tooltip title={t("layerViewSidebar.areaList.deleteTooltip")}>
          <IconButton
            key={`area-list-item-delete-${area.name}`}
            size="small"
            onClick={() => handleConfirmDialogOpen()}
          >
            <Delete color="errorRed" />
          </IconButton>
        </Tooltip>
      );
    }
  };

  //#endregion

  return (
    <div>
      <ListItem key={`area-list-item-${area.name}`} sx={{ pl: paddingSize }}>
        {isExpandable ? addExpandCollapseItem(area) : ""}
        <ListItemText key={`area-list-item-name-${area.name}`}>
          <Typography
            variant="body1"
            fontWeight={area.isActive ? "bold" : "normal"}
          >
            {area.title}
          </Typography>
        </ListItemText>
        {addAreaCustomIcon(area)}
        {addAreaDeleteIcon(area)}
        {addUnzoomArea(area)}
        <Tooltip title={t("layerViewSidebar.areaList.zoomInTooltip")}>
          <IconButton
            key={`area-list-item-zoom-into-${area.name}`}
            size="small"
            color="beigeBrown"
            onClick={() => handleZoomToArea(area)}
          >
            <ZoomIn />
          </IconButton>
        </Tooltip>
      </ListItem>
      <Divider key={`area-list-item-divider-${area.name}`} />
      <Dialog
        key={`area-list-item-dialog-${area.name}`}
        open={confirmDialogOpened}
        onClose={() => handleConfirmDialogNo()}
      >
        <DialogTitle key={`area-list-item-dialog-title-${area.name}`}>
          <Typography variant="annotation">
            {`${t("layerViewSidebar.areaList.confirmDeleteMessage")} `}
            <span style={{ fontWeight: "bold" }}>{area.title}</span>
            {"?"}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogNo()} color="errorRed">
            {t("layerViewSidebar.areaList.confirmDeleteNo")}
          </Button>
          <Button
            onClick={() => handleConfirmDialogYes()}
            autoFocus
            color="darkGreen"
          >
            {t("layerViewSidebar.areaList.confirmDeleteYes")}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t("errorSnackbar.errorDelete")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AreaListItem;

AreaListItem.propTypes = {
  area: PropTypes.object,
  hierarchyLevel: PropTypes.number,
  isExpandable: PropTypes.bool,
  handleZoomToArea: PropTypes.func,
  handleUnzoomArea: PropTypes.func,
  handleExpandCollapse: PropTypes.func,
  isExpanded: PropTypes.func,
};
