import { useQuery } from "react-query";
import apiClient from "../http-common";

export const useAreas = (userId) =>
  useQuery("areas", () => apiClient.get(`/area/${userId}`).then((r) => r.data));

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
  useQuery("activateArea", () =>
    apiClient.get(`/areas/activate/${userId}/${areaId}`).then((r) => r.data)
  );

export const deactivateArea = (userId, areaId) =>
  useQuery("deactivateArea", () =>
    apiClient.get(`/areas/deactivate/${userId}/${areaId}`).then((r) => r.data)
  );

export const addFavoriteArea = (userId, areaId) =>
  useQuery("addFavoriteArea", () =>
    apiClient.get(`/areas/addFavorite/${userId}/${areaId}`).then((r) => r.data)
  );

export const removeFavoriteArea = (userId, areaId) =>
  useQuery("removeFavoriteArea", () =>
    apiClient
      .get(`/areas/removeFavorite/${userId}/${areaId}`)
      .then((r) => r.data)
  );

export const addCustomArea = (userId, areaId) =>
  useQuery("addCustomArea", () =>
    apiClient.get(`/areas/addCustom/${userId}/${areaId}`).then((r) => r.data)
  );

export const removeCustomArea = (userId, areaId) =>
  useQuery("removeCustomArea", () =>
    apiClient.get(`/areas/removeCustom/${userId}/${areaId}`).then((r) => r.data)
  );
