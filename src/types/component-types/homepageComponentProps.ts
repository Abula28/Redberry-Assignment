import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";

export type HompageComponentProps = {
  estatesData: GetRealEstatesRes[];
  regionsData: GetRegionsRes[];
  activeBtn: number | undefined;
  selectedRegions: string[];
  handleSelectRegion: (e: string) => void;
  handleActiveDropdown: (e: number) => void;
  handleRemoveRegion: (e: string) => void;
  clearAllFilters: () => void;
};

export type RegionsDropdownProps = {
  data: GetRegionsRes[];
  selectedRegions: string[];
  handleSelectRegion: (e: string) => void;
};
