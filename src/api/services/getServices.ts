import { getAxiosClient } from "../axiosClient";
import { agentsEnpoint } from "../endpoints";
import { GetAgentsRes } from "../responses";

export const getAgents = async (): Promise<GetAgentsRes> => {
  const response = await getAxiosClient().get(agentsEnpoint());
  const data = await response.data;

  return data;
};
