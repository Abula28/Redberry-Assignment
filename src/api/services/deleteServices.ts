import { getAxiosClient } from "../axiosClient";
import { realEstatesEndpoint } from "../endpoints";
import { MessageRes } from "../responses";

export const deleteRealEstate = async (id: number): Promise<MessageRes> => {
  const response = await getAxiosClient().delete(realEstatesEndpoint(id));
  const result = await response.data;

  return result;
};
