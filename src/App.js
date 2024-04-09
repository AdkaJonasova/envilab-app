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
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
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
                  <Route
                    path="/selectView"
                    element={<SelectViewPage />}
                  ></Route>
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
      </Provider>
    </>
  );
}

export default App;
