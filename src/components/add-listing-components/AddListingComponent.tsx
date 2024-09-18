import { Flex } from "antd";
import classes from "./AddListingComponent.module.scss";
import { Radio } from "../common/custom-components/Radio";
import { AddListingComponentProps, AgentDetailsProps } from "@/types";
import AddresDetails from "./address-details/AddresDetails";
import HouseDetails from "./house-details/HouseDetails";
import { PlusIconCircle } from "@/assets";
import AgentDetails from "./agent-details/AgentDetails";

const AddListingComponent: React.FC<AddListingComponentProps> = ({
  radioValue,
  regionsData,
  selectedRegion,
  selectedCity,
  citiesData,
  addressValue,
  houseValues,
  description,
  imageValue,
  agentsData,
  agentImageValue,
  selectedAgent,
  agentValues,
  modalErrors,
  modalOpen,
  selectOpen,
  handleSelectRegion,
  handleRadioChange,
  handleSelectCity,
  handleAddressChange,
  handleHouseChange,
  handleDescriptionChange,
  handleImageChange,
  handleAgentImageChange,
  handleSelectAgent,
  handleInputsChange,
  handleAgentConfirm,
  handleModalClose,
  handleModalOpen,
  handleSelectOpen,
}) => {
  const regionSelectData = regionsData.map((e) => ({
    value: e.id.toString(),
    label: e.name,
  }));

  const citySelectData = citiesData
    .filter((e) => e.region_id.toString() === selectedRegion)
    .map((e) => ({
      value: e.id.toString(),
      label: e.name,
    }));

  const agentsSelectData = agentsData.map((e) => ({
    value: e.id.toString(),
    label: e.name,
  }));

  const addressDetailsProps = {
    selectedRegion,
    selectedCity,
    regionSelectData,
    citySelectData,
    addressValue,
    handleSelectRegion,
    handleRadioChange,
    handleSelectCity,
    handleAddressChange,
    handleDescriptionChange,
  };

  const houseDetailsProps = {
    description,
    houseValues,
    handleHouseChange,
    handleDescriptionChange,
  };

  const agentDetailsProps: AgentDetailsProps = {
    agentsSelectData,
    agentImageValue,
    selectedAgent,
    agentValues,
    modalErrors,
    modalOpen,
    selectOpen,
    handleAgentImageChange,
    handleSelectAgent,
    handleInputsChange,
    handleAgentConfirm,
    handleModalClose,
    handleModalOpen,
    handleSelectOpen,
  };

  return (
    <Flex vertical align="center" gap={61} className={classes.section}>
      <h1>ლისტინგის დამატება</h1>
      <Flex vertical gap={80} className={`w-full`}>
        <Flex vertical gap={8} className={`w-full`}>
          <h2>გარიგების ტიპი</h2>
          <Flex gap={32}>
            <Radio
              value={1}
              onChange={handleRadioChange}
              text="ქირავდება"
              checked={radioValue === 1}
            />
            <Radio
              value={0}
              onChange={handleRadioChange}
              text="იყიდება"
              checked={radioValue === 0}
            />
          </Flex>
        </Flex>

        <AddresDetails {...addressDetailsProps} />

        <HouseDetails {...houseDetailsProps} />

        <Flex vertical gap={5}>
          <label>ატვირთეთ ფოტო</label>
          <div className={`${classes.photoInput} `}>
            <Flex
              justify="center"
              align="center"
              className={classes.inputWrapper}
            >
              <PlusIconCircle />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Flex>
            {imageValue && (
              <img
                src={URL.createObjectURL(imageValue)}
                alt="prev-img"
                className={classes.prevImg}
              />
            )}
          </div>
        </Flex>

        <AgentDetails {...agentDetailsProps} />
      </Flex>
    </Flex>
  );
};

export default AddListingComponent;
