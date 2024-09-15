import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";

export type HompageComponentProps = {
  regionsData: GetRegionsRes[];
  activeBtn: number | undefined;
  selectedRegions: string[];
  priceFrom: number | undefined;
  priceTo: number | undefined;
  areaFrom: number | undefined;
  areaTo: number | undefined;
  bedsValue: number | undefined;
  activeDropdownRef: React.RefObject<HTMLDivElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredData: () => GetRealEstatesRes[];

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
} & AgentModalProps;

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

export interface EstateCardProps extends GetRealEstatesRes {}

export type AgentModalProps = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  agentValues: AgentValuesT;
  imgValue: File | null;
  nameError: boolean;
  surnameError: boolean;
  emailError: boolean;
  phoneError: boolean;
  imageError: boolean;
  handleIputsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AgentValuesT = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};
