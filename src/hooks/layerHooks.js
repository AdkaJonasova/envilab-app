import { useQuery } from "react-query";
import apiClient from "../http-common";

export const useFavoriteLayers = () =>
  useQuery("favoriteLayers", () =>
    fetch("http://localhost:8000/layers/favorite/1")
  );

export const useActiveLayers = () =>
  useQuery("activeLayers", () =>
    apiClient.get("/layers/active/1").then((r) => r.data)
  );
