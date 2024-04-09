import {
  Box,
  Dialog,
  DialogContent,
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
        <DialogContent>
          <Typography variant="information" paddingY={1}>
            {t("layerViewSidebar.layersDetail.noDetail")}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpened} onClose={() => handleCloseDetail()}>
      <DialogTitle>
        {t("layerViewSidebar.layersDetail.dialogTitle")}
      </DialogTitle>
      <DialogContent>
        <Box minWidth={500} maxWidth={1000} overflow={"auto"}>
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

          <Box maxHeight={400} overflow={"auto"} minHeight={200} padding={2}>
            <Grid container direction={"column"} rowSpacing={1}>
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
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LayerDetailPopup;
