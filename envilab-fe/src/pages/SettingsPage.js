import { Divider, Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import { settingsPageMapping } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLayerGroups,
  selectLayersError,
  selectLayersStatus,
} from "../redux/slices/LayersSlice";
import {
  fetchAreas,
  selectAreasError,
  selectAreasStatus,
} from "../redux/slices/AreasSlice";
import { useEffect } from "react";
import { FetchStates } from "../utils/enums";
import { userId } from "../data/mockData";
import Loading from "../components/global/Loading";
import ErrorWindow from "../components/global/ErrorWindow";

const SettingsPage = ({ tab }) => {
  const layersStatus = useSelector(selectLayersStatus);
  const layersError = useSelector(selectLayersError);
  const areasStatus = useSelector(selectAreasStatus);
  const areasError = useSelector(selectAreasError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (layersStatus === FetchStates.Idle) {
      dispatch(fetchLayerGroups(userId));
    }
    if (areasStatus === FetchStates.Idle) {
      dispatch(fetchAreas(userId));
    }
  }, [dispatch, layersStatus, areasStatus]);

  if (
    layersStatus === FetchStates.Idle ||
    layersStatus === FetchStates.Loading ||
    areasStatus === FetchStates.Idle ||
    areasStatus === FetchStates.Loading
  ) {
    return <Loading />;
  }

  if (layersStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={layersError} />;
  }

  if (areasStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={areasError} />;
  }

  const getPageByTab = () => {
    return settingsPageMapping.get(tab);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <SideMenu tab={tab} />
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
        <Grid item xs={10} paddingLeft={3}>
          {getPageByTab()}
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsPage;
