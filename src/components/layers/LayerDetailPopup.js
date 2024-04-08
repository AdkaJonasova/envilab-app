import {
  Dialog,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDetailedData,
  closeDetailedPopup,
  selectDataForSelectedLayer,
  selectDetailedData,
  selectIsDetailDisplayed,
  selectLayer,
  selectSelectedLayer,
} from "../../redux/slices/DetailedDataSlice";

const LayerDetailPopup = () => {
  const layersDetail = useSelector(selectDetailedData);
  const isOpened = useSelector(selectIsDetailDisplayed);
  const selectedLayer = useSelector(selectSelectedLayer);
  const currentData = useSelector(selectDataForSelectedLayer);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // #region Methods

  const handleTabChange = (newValue) => {
    dispatch(selectLayer({ identificator: newValue }));
  };

  const handleCloseDetail = () => {
    dispatch(closeDetailedPopup());
    dispatch(clearDetailedData());
  };

  // #endregion

  if (!layersDetail || layersDetail.length === 0) {
    return (
      <Dialog open={isOpened} onClose={() => handleCloseDetail()}>
        <DialogTitle>
          {t("layerViewSidebar.layersDetail.dialogTitle")}
        </DialogTitle>
        <Typography variant="information" paddingY={1}>
          {t("layerViewSidebar.layersDetail.noDetail")}
        </Typography>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpened} onClose={() => handleCloseDetail()}>
      <DialogTitle>
        {t("layerViewSidebar.layersDetail.dialogTitle")}
      </DialogTitle>
      <Tabs
        value={selectedLayer}
        onChange={(_event, newValue) => handleTabChange(newValue)}
        centered
        variant="fullWidth"
      >
        {layersDetail.map((detail) => (
          <Tab value={detail.identificator} label={detail.title} />
        ))}
      </Tabs>

      <Grid
        container
        direction={"column"}
        padding={2}
        minHeight={200}
        rowSpacing={1}
      >
        {Object.entries(currentData.data).map(([key, value]) => (
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography variant="h3">{key}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{value}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  );
};

export default LayerDetailPopup;
