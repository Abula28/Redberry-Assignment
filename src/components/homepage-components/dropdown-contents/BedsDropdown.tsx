import React, { useState } from "react";
import classes from "./BedsDropdown.module.scss";
import { Flex } from "antd";
import CustomInput from "@/components/common/antd-components/CustomInput";
import { BedsDropdownProps } from "@/types/component-types/homepageComponentProps";
import { ButtonPrimary } from "@/components/common/antd-components";

const BedsDropdown: React.FC<BedsDropdownProps> = ({
  handleBedsConfirm,
  bedsValue,
}) => {
  const [value, setValue] = useState<number | undefined>(bedsValue);
  const handleConfirm = () => {
    handleBedsConfirm(value);
  };
  return (
    <Flex className={classes.dropdown} vertical gap={32}>
      <Flex vertical gap={24} style={{ width: "100%" }}>
        <h2>საძინებლების რაოდენობა</h2>

        <CustomInput
          type="number"
          placeholder="2"
          onChange={(e) => setValue(Number(e.target.value))}
          value={value}
          min={1}
          max={5}
          className={classes.inpWidth}
        />
      </Flex>
      <Flex justify="flex-end" style={{ width: "100%" }}>
        <ButtonPrimary size="small" onClick={handleConfirm}>
          <span className={"btnText"}>არჩევა</span>
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
};

export default BedsDropdown;
