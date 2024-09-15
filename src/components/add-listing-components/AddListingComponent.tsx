import { Flex } from "antd";
import classes from "./AddListingComponent.module.scss";
import { Radio } from "../common/custom-components/Radio";
import { useState } from "react";

const AddListingComponent = () => {
  const [radioValue, setRadioValue] = useState<1 | 0>(0);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(Number(e.target.value) as 1 | 0);
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
      </Flex>
    </Flex>
  );
};

export default AddListingComponent;
