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
import layoutConfig from "../layoutConfigurations/basicLayoutConfig.json";
import RGL, { WidthProvider } from "react-grid-layout";
import { LayoutWindows } from "../utils/enums";
import TableDataWindow from "../components/dataWindows/TableDataWindow";
import TextDataWindow from "../components/dataWindows/TextDataWindow";
import LineGraphDataWindow from "../components/dataWindows/LineGraphDataWindow";
import { getRowCount } from "../utils/customFunctions";
import { Resizable } from "react-resizable";

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
  const [rowHeight, setRowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = (window.innerHeight - 60) / getRowCount(layout);
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
    const elementType = layoutElement.i;
    const height = layoutElement.h * rowHeight;
    switch (elementType) {
      case LayoutWindows.ListSidebar:
        return (
          <Sidebar
            layers={layers}
            areas={areas}
            refetchLayers={refetchLayers}
            height={height}
          />
        );
      case LayoutWindows.MapView:
        return <LayerViewMap layers={layers} height={height} />;
      case LayoutWindows.TableData:
        return (
          <TableDataWindow
            headers={statesHeaders}
            data={states}
            height={height}
          />
        );
      case LayoutWindows.TextData:
        return (
          <TextDataWindow
            header={header}
            subheader={subheader}
            text={text}
            height={height}
          />
        );
      case LayoutWindows.GraphData:
        return <LineGraphDataWindow height={height} />;
    }
  }

  return (
    <ReactGridLayout
      className="app-layout"
      layout={layout}
      cols={12}
      rowHeight={rowHeight}
    >
      {layout.map((layoutElement) => (
        <div key={layoutElement.i}>{getLayoutPart(layoutElement)}</div>
      ))}
    </ReactGridLayout>
  );
};

export default LayerViewPage;
