import { Flex } from "antd";
import classes from "./RegionsDropdown.module.scss";
import CustomChechbox from "@/components/common/antd-components/CustomChechbox";
import { RegionsDropdownProps } from "@/types/component-types/homepageComponentProps";

const RegionsDropdown: React.FC<RegionsDropdownProps> = ({
  data,
  selectedRegions,
  handleSelectRegion,
}) => {
  return (
    <Flex vertical gap={32} className={classes.dropdown}>
      <Flex vertical gap={24} style={{ width: "100%" }}>
        <h2>რეგიონის მიხედვით</h2>

        <div className={classes.regionsList}>
          {data.map((e) => (
            <Flex
              align="center"
              gap={6}
              key={e.id}
              className={classes.checkboxWrapper}
              onClick={() => handleSelectRegion(e.name)}
            >
              <CustomChechbox checked={selectedRegions.includes(e.name)} />{" "}
              <span className={classes.text}>{e.name}</span>
            </Flex>
          ))}
        </div>
      </Flex>
    </Flex>
  );
};

export default RegionsDropdown;
