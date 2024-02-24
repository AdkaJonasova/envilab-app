import React from "react";

import Sidebar from "../components/Sidebar";
import Loading from "../components/global/Loading";
import { useFavoriteLayers } from "../hooks/layerHooks";
import { useFavoriteAreas } from "../hooks/areaHooks";
import { states, statesHeaders, userId } from "../data/mockData";
import LayerViewMap from "../components/mapComponents/LayerViewMap";
import layoutConfig from "../layoutConfig.json";
import RGL, { WidthProvider } from "react-grid-layout";
import { LayoutWindows } from "../utils/enums";
import TableDataWindow from "../components/dataWindows/TableDataWindow";

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

  if (
    !areAreasReady ||
    !areLayersReady ||
    areAreasRefetching ||
    areLayersRefetching
  ) {
    return <Loading />;
  }

  function getLayoutPart(elementType) {
    switch (elementType) {
      case LayoutWindows.ListSidebar:
        return (
          <Sidebar
            layers={layers}
            areas={areas}
            refetchLayers={refetchLayers}
          ></Sidebar>
        );
      case LayoutWindows.MapView:
        return <LayerViewMap layers={layers}></LayerViewMap>;
      case LayoutWindows.TableData:
        return (
          <TableDataWindow
            headers={statesHeaders}
            data={states}
          ></TableDataWindow>
        );
    }
  }

  return (
    <ReactGridLayout
      className="app-layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      marginBottom={1}
      marginTop={1}
    >
      {layout.map((layoutElement) => (
        <div key={layoutElement.i}>{getLayoutPart(layoutElement.i)}</div>
      ))}
    </ReactGridLayout>
  );
};

export default LayerViewPage;
