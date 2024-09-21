import { GetAgentsRes, GetCitiesRes, GetRegionsRes } from "@/api";
import { SelectOptionsT } from "../common-types";

export type AddListingComponentProps = {
  radioValue: 1 | 0;
  regionsData: GetRegionsRes[];
  citiesData: GetCitiesRes[];
  agentsData: GetAgentsRes[];
  imageValue: File | null;
  listingImageError: boolean;

  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  clearValues: () => void;
} & Omit<AddressDetailsT, "regionSelectData" | "citySelectData"> &
  HouseDetailsT &
  Omit<AgentDetailsProps, "agentsSelectData">;

export type AddressDetailsT = {
  selectedRegion: string | undefined;
  selectedCity: string | undefined;
  regionSelectData: SelectOptionsT[];
  citySelectData: SelectOptionsT[];
  addressValue: { address: string; zip_code: string };
  addressError: boolean;
  zipCodeError: boolean;
  regionError: boolean;
  cityError: boolean;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectRegion: (e: string) => void;
  handleSelectCity: (e: string) => void;
};

export type HouseDetailsT = {
  houseValues: { price: number; area: number; bedrooms: number };
  description: string;
  priceError: boolean;
  areaError: boolean;
  bedroomsError: boolean;
  descriptionError: boolean;
  handleHouseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type AgentDetailsProps = {
  agentsSelectData: SelectOptionsT[];

  agentImageValue: File | null;
  selectedAgent: string | undefined;
  agentValues: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };

  modalErrors: {
    nameError: boolean;
    surnameError: boolean;
    emailError: boolean;
    phoneError: boolean;
    imageError: boolean;
  };
  modalOpen: boolean;
  selectOpen: boolean;
  agentError: boolean;

  handleSelectOpen: (e: boolean) => void;
  handleModalOpen: () => void;
  handleAgentConfirm: () => void;
  handleAgentImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalClose: () => void;
  handleSelectAgent: (e: string) => void;
  handleInputsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
