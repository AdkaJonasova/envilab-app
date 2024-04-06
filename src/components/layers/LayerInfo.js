import { ArrowBack } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeSidebarType } from "../../redux/slices/SidebarSlice";
import { SidebarTypes } from "../../utils/enums";

const LayerInfo = ({ layer }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(
      changeSidebarType({ type: SidebarTypes.Layers, selectedLayer: undefined })
    );
  };

  return (
    <div>
      <Grid container marginTop={1} marginBottom={2}>
        <Grid item xs={2}>
          <IconButton color="darkGreen" onClick={() => handleGoBack()}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">{layer.title}</Typography>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <Grid
        container
        rowSpacing={3}
        paddingLeft={2}
        paddingTop={2}
        paddingBottom={1}
        paddingRight={1}
      >
        <Grid item xs={6}>
          <Typography variant="h3">
            {t("layerViewSidebar.layerInfo.name")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{layer.title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">
            {t("layerViewSidebar.layerInfo.type")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{layer.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">
            {t("layerViewSidebar.layerInfo.projection")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{layer.projection}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            {t("layerViewSidebar.layerInfo.description")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{layer.description}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default LayerInfo;

LayerInfo.propTypes = {
  layer: PropTypes.object,
};
