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

export const useLayerById = (userId, layerId) =>
  useQuery("layerById", () =>
    apiClient.get(`/layers/${userId}/${layerId}`).then((r) => r.data)
  );

export const activateLayer = (userId, layerId) =>
  useQuery("activateLayer", () =>
    apiClient.post(`/layers/activate/${userId}/${layerId}`)
  );

export const deactivateLayer = (userId, layerId) =>
  useQuery("deactivateLayer", () =>
    apiClient.post(`/layers/deactivate/${userId}/${layerId}`)
  );

export const addFavoriteLayer = (userId, layerId) =>
  useQuery("addFavoriteLayer", () =>
    apiClient.post(`/layers/addFavorite/${userId}/${layerId}`)
  );

export const removeFavoriteLayer = (userId, layerId) =>
  useQuery("removeFavoriteLayer", () =>
    apiClient.post(`/layers/removeFavorite/${userId}/${layerId}`)
  );
