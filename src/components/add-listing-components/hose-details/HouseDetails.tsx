import { Flex, Input } from "antd";
import React from "react";
import classes from "../AddListingComponent.module.scss";
import CustomInput from "@/components/common/antd-components/CustomInput";
import { HouseDetailsT } from "@/types";

const HouseDetails: React.FC<HouseDetailsT> = ({
  houseValues,
  description,
  handleHouseChange,
  handleDescriptionChange,
}) => {
  const { TextArea } = Input;

  return (
    <Flex vertical gap={22} className="w-full">
      <h2>ბინის დეტალები</h2>

      <Flex vertical gap={20}>
        <Flex gap={20}>
          <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
            <label>ფასი *</label>
            <CustomInput
              name="price"
              value={houseValues.price}
              onChange={handleHouseChange}
              type="text"
            />
            <p className={`${classes.requiredText} `}>
              &#x2713; მხოლოდ რიცხვები
            </p>
          </Flex>

          <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
            <label>ფართობი *</label>
            <CustomInput
              name="price"
              value={houseValues.area}
              onChange={handleHouseChange}
              type="text"
            />
            <p className={`${classes.requiredText} `}>
              &#x2713; მხოლოდ რიცხვები
            </p>
          </Flex>
        </Flex>

        <Flex className={`${classes.inputContainer} w-full`} vertical gap={5}>
          <label>საძინებლების რაოდენობა *</label>
          <CustomInput
            name="price"
            value={houseValues.area}
            onChange={handleHouseChange}
            type="text"
          />
          <p className={`${classes.requiredText} `}>&#x2713; მხოლოდ რიცხვები</p>
        </Flex>

        <Flex className="w-full" vertical gap={5}>
          <label>საძინებლების რაოდენობა *</label>
          <TextArea
            name="price"
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className={`${classes.requiredText} `}>
            &#x2713; მინიმუმ ხუთი სიტყვა
          </p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HouseDetails;
