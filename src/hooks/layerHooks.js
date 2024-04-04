import { useQuery } from "react-query";
import apiClient from "../http-common";

export const useFavoriteLayers = (userId) =>
  useQuery("favoriteLayers", () =>
    apiClient.get(`/layers/favorite/${userId}`).then((r) => r.data)
  );

export const useActiveLayers = (userId) =>
  useQuery("activeLayers", () =>
    apiClient.get(`/layers/active/${userId}`).then((r) => r.data)
  );

export const useLayers = (userId) =>
  useQuery("layers", () =>
    apiClient.get(`/layers/${userId}`).then((r) => r.data)
  );

export const useLayerById = (userId, layerName) =>
  useQuery("layerById", () =>
    apiClient.get(`/layers/${userId}/${layerName}`).then((r) => r.data)
  );

export const activateLayer = (userId, layerName) =>
  apiClient.post(`/layers/activate/${userId}/${layerName}`);

export const deactivateLayer = (userId, layerName) =>
  apiClient.post(`/layers/deactivate/${userId}/${layerName}`);

export const changeFavoriteLayers = (userId, layersToChange) =>
  apiClient.post(`/layers/favorites/${userId}`, {
    layers: layersToChange,
  });

export const setOpacityForLayer = (userId, layerName, opacity) =>
  apiClient.post(`/layers/setOpacity/${userId}/${layerName}`, {
    opacity: opacity,
  });
