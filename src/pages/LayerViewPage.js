import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Loading from "../components/global/Loading";
import {
  header,
  states,
  statesHeaders,
  subheader,
  text,
  userId,
} from "../data/mockData";
import LayerViewMap from "../components/mapComponents/LayerViewMap";
import layoutConfig from "../layoutConfigurations/basicLayoutConfig.json";
import RGL, { WidthProvider } from "react-grid-layout";
import { FetchStates, LayoutWindows } from "../utils/enums";
import TableDataWindow from "../components/dataWindows/TableDataWindow";
import TextDataWindow from "../components/dataWindows/TextDataWindow";
import LineGraphDataWindow from "../components/dataWindows/LineGraphDataWindow";
import { Box } from "@mui/material";
import { pageBottomMargin, pageTopMargin } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchLayerGroups } from "../redux/slices/LayersSlice";
import { fetchAreas } from "../redux/slices/AreasSlice";
import { calculateLayout } from "../redux/slices/LayoutSlice";
import ErrorWindow from "../components/global/ErrorWindow";

const LayerViewPage = () => {
  const layout = useSelector((state) => state.layout);
  const { areas, areasStatus, areasError } = useSelector(
    (state) => state.areas
  );
  const { layerGroups, layersStatus, layersError } = useSelector(
    (state) => state.layers
  );
  const ReactGridLayout = WidthProvider(RGL);

  const dispatch = useDispatch();

  useEffect(() => {
    if (layersStatus === FetchStates.Idle) {
      dispatch(fetchLayerGroups(userId));
    }
    if (areasStatus === FetchStates.Idle) {
      dispatch(fetchAreas(userId));
    }
  }, [dispatch, layersStatus, areasStatus]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        calculateLayout({
          layout: layoutConfig.layout,
          windowHeight: window.innerHeight,
        })
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  if (
    areasStatus === FetchStates.Loading ||
    areasStatus === FetchStates.Idle ||
    layersStatus === FetchStates.Loading ||
    layersStatus === FetchStates.Idle
  ) {
    return <Loading />;
  }

  if (areasStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={areasError} />;
  }

  if (layersStatus === FetchStates.Failed) {
    return <ErrorWindow errorMessage={layersError} />;
  }

  //#region Methods
  const getMapWindow = () => {
    if (layout.mapElement.isActive) {
      return (
        <div key={LayoutWindows.MapView}>
          <LayerViewMap
            height={layout.mapElement.height}
            marginBottom={layout.mapElement.bottomMargin}
          />
        </div>
      );
    }
  };

  const getSidebarWindow = () => {
    if (layout.sidebarElement.isActive) {
      return (
        <div key={LayoutWindows.ListSidebar}>
          <Sidebar
            height={layout.sidebarElement.height}
            marginBottom={layout.sidebarElement.bottomMargin}
          />
        </div>
      );
    }
  };

  const getTableDataWindow = () => {
    if (layout.tableWindowElement.isActive) {
      return (
        <div key={LayoutWindows.TableData}>
          <TableDataWindow
            headers={statesHeaders}
            data={states}
            height={layout.tableWindowElement.height}
            marginBottom={layout.tableWindowElement.bottomMargin}
          />
        </div>
      );
    }
  };

  const getGraphDataWindow = () => {
    if (layout.graphWindowElement.isActive) {
      return (
        <div key={LayoutWindows.GraphData}>
          <LineGraphDataWindow
            height={layout.graphWindowElement.height}
            marginBottom={layout.graphWindowElement.bottomMargin}
          />
        </div>
      );
    }
  };

  const getTextDataWindow = () => {
    if (layout.textWindowElement.isActive) {
      return (
        <div key={LayoutWindows.TextData}>
          <TextDataWindow
            header={header}
            subheader={subheader}
            text={text}
            height={layout.textWindowElement.height}
            marginBottom={layout.textWindowElement.bottomMargin}
          />
        </div>
      );
    }
  };

  //#endregion

  return (
    <Box
      sx={{
        marginTop: `${pageTopMargin}px`,
        marginBottom: `${pageBottomMargin}px`,
      }}
    >
      <ReactGridLayout
        className="app-grid-layout"
        layout={layoutConfig.layout}
        cols={12}
        rowHeight={layout.rowHeight}
        margin={[10, 0]}
      >
        {getMapWindow()}
        {getSidebarWindow()}
        {getGraphDataWindow()}
        {getTableDataWindow()}
        {getTextDataWindow()}
      </ReactGridLayout>
    </Box>
  );
};

export default LayerViewPage;
