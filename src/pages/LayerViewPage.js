import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Loading from "../components/global/Loading";
import { useFavoriteLayers } from "../hooks/layerHooks";
import { useFavoriteAreas } from "../hooks/areaHooks";
import {
  header,
  states,
  statesHeaders,
  subheader,
  text,
  userId,
} from "../data/mockData";
import LayerViewMap from "../components/mapComponents/LayerViewMap";
import layoutConfig from "../layoutConfigurations/tableGraphLayoutConfig.json";
import RGL, { WidthProvider } from "react-grid-layout";
import { LayoutWindows } from "../utils/enums";
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

const LayerViewPage = () => {
  const {
    data: layers,
    isFetched: areLayersReady,
    isRefetching: areLayersRefetching,
    refetch: refetchLayers,
  } = useFavoriteLayers(userId);
  const {
    data: areas,
    isFetched: areAreasReady,
    isRefetching: areAreasRefetching,
    refetch: refetchAreas,
  } = useFavoriteAreas(userId);

  const { layout } = layoutConfig;
  const ReactGridLayout = WidthProvider(RGL);

  const [rowCount, setRowCount] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);

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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (
    !areAreasReady ||
    !areLayersReady ||
    areAreasRefetching ||
    areLayersRefetching
  ) {
    return <Loading />;
  }

  function getLayoutPart(layoutElement) {
    const isLast = isLastVerticalElement(layoutElement, rowCount);
    const height = isLast
      ? layoutElement.h * rowHeight
      : layoutElement.h * rowHeight - 6;
    const bottomMargin = isLast ? 0 : betweenElementsMargin;

    switch (layoutElement.i) {
      case LayoutWindows.ListSidebar:
        return (
          <Sidebar
            layers={layers}
            areas={areas}
            refetchLayers={refetchLayers}
            height={height}
            marginBottom={bottomMargin}
          />
        );
      case LayoutWindows.MapView:
        return (
          <LayerViewMap
            layers={layers}
            height={height}
            marginBottom={bottomMargin}
          />
        );
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
  }

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
