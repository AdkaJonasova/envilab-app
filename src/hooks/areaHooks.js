import { useQuery } from "react-query";
import apiClient from "../http-common";

export const useAreas = (userId) =>
  useQuery("areas", () =>
    apiClient.get(`/areas/${userId}`).then((r) => r.data)
  );

export const useActiveAreas = (userId) =>
  useQuery("activeAreas", () =>
    apiClient.get(`/areas/active/${userId}`).then((r) => r.data)
  );

export const useFavoriteAreas = (userId) =>
  useQuery("favoriteAreas", () =>
    apiClient.get(`/areas/favorite/${userId}`).then((r) => r.data)
  );

export const useCustomAreas = (userId) =>
  useQuery("customAreas", () =>
    apiClient.get(`/areas/custom/${userId}`).then((r) => r.data)
  );

export const activateArea = (userId, areaId) =>
  apiClient.post(`/areas/activate/${userId}/${areaId}`);

export const deactivateArea = (userId, areaId) =>
  apiClient.post(`/areas/deactivate/${userId}/${areaId}`);

export const changeFavoriteAreas = (userId, areasToChange) =>
  apiClient.post(`/areas/favorites/${userId}`, {
    areas: areasToChange,
  });

export const addCustomArea = (userId, areaId) =>
  apiClient.post(`/areas/addCustom/${userId}/${areaId}`);

export const removeCustomArea = (userId, areaId) =>
  apiClient.post(`/areas/removeCustom/${userId}/${areaId}`);

export const createCustomArea = (userId, areaTitle, areaGeojson) =>
  apiClient.put(`/areas/custom/${userId}`, {
    title: areaTitle,
    geojson: areaGeojson,
  });
