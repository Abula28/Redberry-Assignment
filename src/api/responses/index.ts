export type GetAgentsRes = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: string;
};

export type GetRealEstatesRes = {
  id: number;
  address: string;
  description: string;
  image: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  city_id: number;
  city: GetCitiesRes;
};

export type GetCitiesRes = {
  id: number;
  name: string;
  region_id: number;
  region: GetRegionsRes;
};

export type GetRegionsRes = {
  id: number;
  name: string;
};

export type MessageRes = { message: string };
