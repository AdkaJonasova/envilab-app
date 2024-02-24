import { useQuery } from "react-query";
import apiClient from "../http-common";
import { mockAreas } from "../data/mockData";
import { mergeAreas } from "./customHooks";

export const useAreas = (userId) =>
  useQuery("areas", async () => {
    let areaInfos = (await apiClient.get(`/areas/${userId}`)).data;
    let geoAreas = mockAreas;
    return mergeAreas(geoAreas, areaInfos, true);
  });

export const useActiveAreas = (userId) =>
  useQuery("activeAreas", () =>
    apiClient.get(`/areas/active/${userId}`).then((r) => r.data)
  );

export const useFavoriteAreas = (userId) =>
  useQuery("favoriteAreas", async () => {
    let areaInfos = (await apiClient.get(`/areas/favorite/${userId}`)).data;
    let geoAreas = mockAreas;
    return mergeAreas(geoAreas, areaInfos);
  });

export const useCustomAreas = (userId) =>
  useQuery("customAreas", () =>
    apiClient.get(`/areas/custom/${userId}`).then((r) => r.data)
  );

export const activateArea = (userId, areaId) =>
  apiClient.post(`/areas/activate/${userId}/${areaId}`);

export const deactivateArea = (userId, areaId) =>
  apiClient.post(`/areas/deactivate/${userId}/${areaId}`);

export const addFavoriteArea = (userId, areaId) =>
  apiClient.post(`/areas/addFavorite/${userId}/${areaId}`);

export const removeFavoriteArea = (userId, areaId) =>
  apiClient.post(`/areas/removeFavorite/${userId}/${areaId}`);

export const addCustomArea = (userId, areaId) =>
  apiClient.post(`/areas/addCustom/${userId}/${areaId}`);

export const removeCustomArea = (userId, areaId) =>
  apiClient.post(`/areas/removeCustom/${userId}/${areaId}`);
