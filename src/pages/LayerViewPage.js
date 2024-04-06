import React, { useEffect, useState } from "react";

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
import { getRowCount, isLastVerticalElement } from "../utils/customFunctions";
import { Box } from "@mui/material";
import {
  betweenElementsMargin,
  mainMenuHeight,
  pageBottomMargin,
  pageTopMargin,
} from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchLayerGroups } from "../redux/slices/LayersSlice";
import { fetchAreas } from "../redux/slices/AreasSlice";

const LayerViewPage = () => {
  const { layout } = layoutConfig;
  const ReactGridLayout = WidthProvider(RGL);

  const [rowCount, setRowCount] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);

  const dispatch = useDispatch();
  const { areas, areasStatus, areasError } = useSelector(
    (state) => state.areas
  );
  const { layerGroups, layersStatus, layersError } = useSelector(
    (state) => state.layers
  );

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
      const windowLayoutPart =
        window.innerHeight - mainMenuHeight - pageBottomMargin - pageTopMargin;
      const rowCount = getRowCount(layout);
      const calculatedHeight = windowLayoutPart / getRowCount(layout);
      setRowCount(rowCount);
      setRowHeight(calculatedHeight);
    };
    handleResize();
    // window.addEventListener("resize", handleResize);
    return () => {
      // window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (
    areasStatus === FetchStates.Loading ||
    areasStatus === FetchStates.Idle ||
    layersStatus === FetchStates.Loading ||
    layersStatus === FetchStates.Idle
  ) {
    return <Loading />;
  }

  const getLayoutPart = (layoutElement) => {
    const isLast = isLastVerticalElement(layoutElement, rowCount);
    const height = isLast
      ? layoutElement.h * rowHeight
      : layoutElement.h * rowHeight - 6;
    const bottomMargin = isLast ? 0 : betweenElementsMargin;

    switch (layoutElement.i) {
      case LayoutWindows.ListSidebar:
        return <Sidebar height={height} marginBottom={bottomMargin} />;
      case LayoutWindows.MapView:
        return <LayerViewMap height={height} marginBottom={bottomMargin} />;
      case LayoutWindows.TableData:
        return (
          <TableDataWindow
            headers={statesHeaders}
            data={states}
            height={height}
            marginBottom={bottomMargin}
          />
        );
      case LayoutWindows.TextData:
        return (
          <TextDataWindow
            header={header}
            subheader={subheader}
            text={text}
            height={height}
            marginBottom={bottomMargin}
          />
        );
      case LayoutWindows.GraphData:
        return (
          <LineGraphDataWindow height={height} marginBottom={bottomMargin} />
        );
    }
  };

  return (
    <Box
      sx={{
        marginTop: `${pageTopMargin}px`,
        marginBottom: `${pageBottomMargin}px`,
      }}
    >
      <ReactGridLayout
        className="app-grid-layout"
        layout={layout}
        cols={12}
        rowHeight={rowHeight}
        margin={[10, 0]}
      >
        {layout.map((layoutElement) => (
          <div key={layoutElement.i}>{getLayoutPart(layoutElement)}</div>
        ))}
      </ReactGridLayout>
    </Box>
  );
};

export default LayerViewPage;
