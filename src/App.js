import "./index.css";
import MainMenu from "./components/MainMenu";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayerViewPage from "./pages/LayerViewPage";
import SelectViewPage from "./pages/SelectViewPage";

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

  return (
    <>
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
            </Routes>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
