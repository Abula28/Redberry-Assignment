import { GetAgentsRes } from "@/api/responses";
import { getAgents } from "@/api/services/getServices";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState<GetAgentsRes>();
  const getData = async () => {
    const res = await getAgents();
    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
