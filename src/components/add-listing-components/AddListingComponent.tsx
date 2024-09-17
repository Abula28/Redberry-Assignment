import { Flex } from "antd";
import classes from "./AddListingComponent.module.scss";
import { Radio } from "../common/custom-components/Radio";
import { AddListingComponentProps } from "@/types";
import AddresDetails from "./address-details/AddresDetails";
import HouseDetails from "./hose-details/HouseDetails";

const AddListingComponent: React.FC<AddListingComponentProps> = ({
  radioValue,
  selectValue,
  regionsData,
  selectedRegion,
  selectedCity,
  citiesData,
  addressValue,
  houseValues,
  description,

  handleSelectRegion,
  handleRadioChange,
  handleSelectCity,
  handleAddressChange,
  handleHouseChange,
  handleDescriptionChange,
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
      </Flex>
    </Flex>
  );
};

export default AddListingComponent;
