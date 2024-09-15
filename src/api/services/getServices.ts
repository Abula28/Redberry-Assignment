import { getAxiosClient } from "../axiosClient";
import {
  agentsEnpoint,
  citiesEndpoint,
  realEstatesEndpoint,
  regionsEndpoint,
} from "../endpoints";
import {
  GetAgentsRes,
  GetCitiesRes,
  GetEstateRes,
  GetRealEstatesRes,
  GetRegionsRes,
} from "../responses";

// ========== Agents ========== //
export const getAgents = async (): Promise<GetAgentsRes[]> => {
  const response = await getAxiosClient().get(agentsEnpoint());
  const result = await response.data;

  return result;
};

// ========== Real Estates ========== //
export const getRealEstates = async (): Promise<GetRealEstatesRes[]> => {
  const response = await getAxiosClient().get(realEstatesEndpoint());
  const result = await response.data;

  return result;
};

export const getRealEstateById = async (id: string): Promise<GetEstateRes> => {
  const response = await getAxiosClient().get(realEstatesEndpoint(id));
  const result = await response.data;

  return result;
};

// ========== Cities ========== //
export const getCities = async (): Promise<GetCitiesRes[]> => {
  const response = await getAxiosClient().get(citiesEndpoint());
  const result = await response.data;

  return result;
};

// ========== Regions ========== //
export const getRegions = async (): Promise<GetRegionsRes[]> => {
  const response = await getAxiosClient().get(regionsEndpoint());
  const result = await response.data;

  return result;
};
