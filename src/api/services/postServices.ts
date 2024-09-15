import { getAxiosClient } from "../axiosClient";
import { agentsEnpoint, realEstatesEndpoint } from "../endpoints";
import { PostAgentsReq, PostRealEstatesReq } from "../requests";
import { GetAgentsRes, GetRealEstatesRes } from "../responses";

export const postAgents = async (
  data: PostAgentsReq
): Promise<GetAgentsRes> => {
  const response = await getAxiosClient().post(agentsEnpoint(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const result = await response.data;

  return result;
};

export const postRealEstates = async (
  data: PostRealEstatesReq
): Promise<GetRealEstatesRes> => {
  const response = await getAxiosClient().post(realEstatesEndpoint(), data);
  const result = await response.data;

  return result;
};
