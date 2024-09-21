import CustomInput from "@/components/common/antd-components/CustomInput";
import { Flex } from "antd";
import React from "react";
import classes from "../AddListingComponent.module.scss";
import { AddressDetailsT } from "@/types";
import Select from "@/components/common/custom-components/Select";

const AddresDetails: React.FC<AddressDetailsT> = ({
  regionSelectData,
  citySelectData,
  selectedRegion,
  selectedCity,
  addressValue,
  addressError,
  zipCodeError,
  regionError,
  cityError,
  handleSelectCity,
  handleSelectRegion,
  handleAddressChange,
}) => {
  return (
    <Flex vertical gap={22} className={`w-full`}>
      <h2>მდებარეობა</h2>

      <Flex vertical gap={20} className={`w-full`}>
        <Flex className={`${classes.inputContainerWrapper} w-full`} gap={20}>
          <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
            <label>მისამართი *</label>
            <CustomInput
              name="address"
              value={addressValue.address}
              onChange={handleAddressChange}
              type="text"
            />
            <p
              className={`${classes.requiredText} ${
                addressError && classes.error
              } ${addressValue.address.trim().length >= 2 && classes.success} `}
            >
              &#x2713; მინიმუმ ორი სიმბოლო
            </p>
          </Flex>

          <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
            <label>საფოსტო ინდექსი *</label>
            <CustomInput
              name="zip_code"
              value={addressValue.zip_code}
              onChange={handleAddressChange}
              type="number"
            />
            <p
              className={`${classes.requiredText} ${
                zipCodeError && classes.error
              } ${Number(addressValue.zip_code) > 0 && classes.success} `}
            >
              &#x2713; მხოლოდ რიცხვები
            </p>
          </Flex>
        </Flex>

        <Flex className={`${classes.inputContainerWrapper} w-full`} gap={20}>
          <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
            <label>რეგიონი *</label>
            <Select
              options={regionSelectData}
              value={selectedRegion}
              onChange={handleSelectRegion}
              text={"აირჩიეთ რეგიონი"}
              error={regionError && !selectedRegion}
            />
          </Flex>

          {selectedRegion && (
            <Flex
              className={`${classes.inputContainer} w-full`}
              vertical
              gap={5}
            >
              <label>ქალაქი</label>
              <Select
                text="აირჩიეთ ქალაქი"
                value={selectedCity}
                onChange={handleSelectCity}
                options={citySelectData}
                error={cityError && !selectedCity}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddresDetails;
