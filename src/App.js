import "./index.css";
import MainMenu from "./components/global/MainMenu";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayerViewPage from "./pages/LayerViewPage";
import SelectViewPage from "./pages/SelectViewPage";
import SettingsPage from "./pages/SettingsPage";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  // const lessZoom = (map) => {
  //   const view = map.getView();
  //   const currentZoom = view.getZoom();
  //   const newZoom = currentZoom - 0.5;
  //   view.setZoom(newZoom);
  // };

  // const zoom = (map) => {
  //   console.log("zoom");
  //   const view = map.getView();
  //   const currentZoom = view.getZoom();
  //   const newZoom = currentZoom + 1;
  //   view.setZoom(newZoom);
  // };

  // const increaseResolution = (map) => {
  //   const view = map.getView();
  //   const currentResolution = view.getResolution();
  //   const newResolution = currentResolution / 2;
  //   view.setResolution(newResolution);
  // };

  // const decreaseResolution = (map) => {
  //   const view = map.getView();
  //   const currentResolution = view.getResolution();
  //   const newResolution = currentResolution * 2;
  //   view.setResolution(newResolution);
  // };

  // const originalCenter = (map) => {
  //   const view = map.getView();
  //   const currentCenter = view.getCenter();
  //   const newCenter = [0, 0];
  //   view.setCenter(newCenter);
  // };

  // const changeCenter = (map) => {
  //   const view = map.getView();
  //   const currentCenter = view.getCenter();
  //   const newCenter = [-10725196.690349146, 5635012.033203788];
  //   view.setCenter(newCenter);
  // };
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MainMenu />
            <main>
              <Routes>
                <Route
                  index
                  path="/"
                  element={<Navigate replace to={"/layerView"} />}
                ></Route>
                <Route path="/layerView" element={<LayerViewPage />}></Route>
                <Route path="/selectView" element={<SelectViewPage />}></Route>
                <Route
                  path="/settings"
                  element={<Navigate replace to={"/settings/layers"} />}
                ></Route>
                <Route
                  path="/settings/layers"
                  element={<SettingsPage tab={"layers"} />}
                ></Route>
                <Route
                  path="/settings/areas"
                  element={<SettingsPage tab={"areas"} />}
                ></Route>
              </Routes>
            </main>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
