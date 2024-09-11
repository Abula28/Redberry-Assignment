export const agentsEnpoint = () => {
  return `agents`;
};

export const realEstatesEndpoint = (id?: number) => {
  return `real-estates${id ? `/${id}` : ""}`;
};

export const citiesEndpoint = () => {
  return `cities`;
};

export const regionsEndpoint = () => {
  return `regions`;
};
