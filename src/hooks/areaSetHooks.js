import { useQuery } from "react-query";
import apiClient from "../http-common";

export const useAreaSets = () =>
  useQuery("areaSets", () => apiClient.get("/areaSets").then((r) => r.data));

export const useAreasInSet = (areaSetId) =>
  useQuery("areasInSet", () =>
    apiClient.get(`/areaSets/areas/${areaSetId}`).then((r) => r.data)
  );

export const useAreaSetsForArea = (areaId) =>
  useQuery("areaSetsForArea", () =>
    apiClient.get(`/areaSets/${areaId}`).then((r) => r.data)
  );

export const addAreaToSet = (areaSetId, areaId) =>
  useQuery("addAreaToSet", () =>
    apiClient.post(`/areaSets/addArea/${areaSetId}/${areaId}`)
  );

export const removeAreaFromSet = (areaSetId, areaId) =>
  useQuery("removeAreaFromSet", () =>
    apiClient.post(`/areaSets/removeArea/${areaSetId}/${areaId}`)
  );

// TODO: resolve how to call this endpoint
export const createAreaSet = (areaSetName, areas) =>
  useQuery("createAreaSet", () => apiClient.put("/areaSets/new/"));
