import { GetAgentsRes, GetRealEstatesRes } from "../responses";

export interface PostAgentsReq extends Omit<GetAgentsRes, "id" | "avatar"> {
  avatar: File;
}

export interface PostRealEstatesReq
  extends Omit<GetRealEstatesRes, "id" | "city" | "avatar"> {
  description: string;
  region_id: number;
  agent_id: number;
}
