// ========== Agents ========== //
export const agentsEnpoint = () => {
  return `agents`;
};

// ========== Real Estates ========== //
export const realEstatesEndpoint = (id?: string) => {
  return `real-estates${id ? `/${id}` : ""}`;
};

// ========== Cities ========== //
export const citiesEndpoint = () => {
  return `cities`;
};

// ========== Regions ========== //
export const regionsEndpoint = () => {
  return `regions`;
};
