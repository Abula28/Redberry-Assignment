import { GetAgentsRes, GetRealEstatesRes } from "../responses";

export interface PostAgentsReq extends Omit<GetAgentsRes, "id"> {}

export interface PostRealEstatesReq
  extends Omit<GetRealEstatesRes, "id" | "city"> {
  description: string;
  region_id: number;
  agent_id: number;
}
