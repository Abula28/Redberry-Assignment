import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";

export type HompageComponentProps = {
  estatesData: GetRealEstatesRes[];
  regionsData: GetRegionsRes[];
  activeBtn: number | undefined;
  selectedRegions: string[];
  priceFrom: number | undefined;
  priceTo: number | undefined;
  areaFrom: number | undefined;
  areaTo: number | undefined;
  bedsValue: number | undefined;

  handleSelectRegion: (e: string[]) => void;
  handleActiveDropdown: (e: number) => void;
  handleRemoveRegion: (e: string) => void;
  handlePriceConfirm: (
    from: number | undefined,
    to: number | undefined
  ) => void;
  handleAreaConfirm: (from: number | undefined, to: number | undefined) => void;
  handleBedsConfirm: (beds: number | undefined) => void;
  handleRemovePricesRange: () => void;
  handleRemoveareaRange: () => void;
  handleRemoveBeds: () => void;
  clearAllFilters: () => void;
};

export type RegionsDropdownProps = {
  data: GetRegionsRes[];
  selectedRegions: string[];
  handleSelectRegion: (e: string[]) => void;
};

export type PriceDropdownProps = {
  handlePriceConfirm: (
    from: number | undefined,
    to: number | undefined
  ) => void;

  handleAreaConfirm: (from: number | undefined, to: number | undefined) => void;
  isPrice?: true;

  priceFrom: number | undefined;
  priceTo: number | undefined;
  areaFrom: number | undefined;
  areaTo: number | undefined;
};

export type BedsDropdownProps = {
  handleBedsConfirm: (beds: number | undefined) => void;
  bedsValue: number | undefined;
};
