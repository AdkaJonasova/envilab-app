import { useQuery } from "react-query";
import apiClient from "../http-common";
import { mockLayers } from "../data/mockData";
import { mergeLayers } from "./customHooks";

export const useFavoriteLayers = (userId) =>
  useQuery("favoriteLayers", async () => {
    let layerInfos = (await apiClient.get(`/layers/favorite/${userId}`)).data;
    let geoLayers = mockLayers;
    return mergeLayers(geoLayers, layerInfos);
  });

export const useActiveLayers = (userId) =>
  useQuery("activeLayers", () =>
    apiClient.get(`/layers/active/${userId}`).then((r) => r.data)
  );

export const useLayers = (userId) =>
  useQuery("layers", async () => {
    let layerInfos = (await apiClient.get(`/layers/${userId}`)).data;
    let geoLayers = mockLayers;
    return mergeLayers(geoLayers, layerInfos, true);
  });

export const useLayerById = (userId, layerId) =>
  useQuery("layerById", () =>
    apiClient.get(`/layers/${userId}/${layerId}`).then((r) => r.data)
  );

export const activateLayer = (userId, layerId) =>
  apiClient.post(`/layers/activate/${userId}/${layerId}`);

export const deactivateLayer = (userId, layerId) =>
  apiClient.post(`/layers/deactivate/${userId}/${layerId}`);

export const addFavoriteLayer = (userId, layerId) =>
  apiClient.post(`/layers/addFavorite/${userId}/${layerId}`);

export const removeFavoriteLayer = (userId, layerId) =>
  apiClient.post(`/layers/removeFavorite/${userId}/${layerId}`);
