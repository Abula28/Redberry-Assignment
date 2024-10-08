import { Flex } from "antd";
import classes from "./RegionsDropdown.module.scss";
import CustomChechbox from "@/components/common/antd-components/CustomChechbox";
import { RegionsDropdownProps } from "@/types/component-types/homepageComponentProps";
import { useState } from "react";
import { ButtonPrimary } from "@/components/common/antd-components";

const RegionsDropdown: React.FC<RegionsDropdownProps> = ({
  data,
  selectedRegions,
  handleSelectRegion,
}) => {
  const [regions, setRegions] = useState<string[]>(() =>
    selectedRegions ? selectedRegions : []
  );

  const handleConfirm = () => {
    handleSelectRegion(regions);
    setRegions([]);
  };

  return (
    <Flex vertical gap={32} className={classes.dropdown}>
      <Flex vertical gap={32}>
        <Flex vertical gap={24} className={`w-full`}>
          <h2>რეგიონის მიხედვით</h2>

          <div className={classes.regionsList}>
            {data.map((e) => (
              <Flex
                align="center"
                gap={6}
                key={e.id}
                className={classes.checkboxWrapper}
                onClick={() =>
                  setRegions((prev) => {
                    if (prev.includes(e.name))
                      return prev.filter((el) => el !== e.name);

                    return [...prev, e.name];
                  })
                }
              >
                <CustomChechbox checked={regions.includes(e.name)} />{" "}
                <span className={classes.text}>{e.name}</span>
              </Flex>
            ))}
          </div>
        </Flex>

        <Flex justify="flex-end" className={`w-full`}>
          <ButtonPrimary size="small" onClick={handleConfirm}>
            <span className={"btnText"}>არჩევა</span>
          </ButtonPrimary>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegionsDropdown;
