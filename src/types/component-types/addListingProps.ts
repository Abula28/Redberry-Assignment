import { GetCitiesRes, GetRegionsRes } from "@/api";
import { SelectOptionsT } from "../common-types";

export type AddListingComponentProps = {
  radioValue: 1 | 0;
  selectValue: string;
  regionsData: GetRegionsRes[];
  citiesData: GetCitiesRes[];

  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<AddressDetailsT, "regionSelectData" | "citySelectData"> &
  HouseDetailsT;

export type AddressDetailsT = {
  selectedRegion: string | undefined;
  selectedCity: string | undefined;
  regionSelectData: SelectOptionsT[];
  citySelectData: SelectOptionsT[];
  addressValue: { address: string; zip_code: number };

  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectRegion: (e: string) => void;
  handleSelectCity: (e: string) => void;
};

export type HouseDetailsT = {
  houseValues: { price: number; area: number; bedrooms: number };
  description: string;
  handleHouseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
