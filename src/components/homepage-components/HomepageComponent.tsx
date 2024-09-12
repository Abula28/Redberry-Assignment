import { Flex, Tag } from "antd";
import classes from "./HomepageComponent.module.scss";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HompageComponentProps } from "@/types/component-types/homepageComponentProps";
import RegionsDropdown from "./dropdown-contents/RegionsDropdown";

const HomepageComponent: React.FC<HompageComponentProps> = ({
  estatesData,
  regionsData,
  activeBtn,
  selectedRegions,
  handleSelectRegion,
  handleActiveDropdown,
  handleRemoveRegion,
  clearAllFilters,
}) => {
  const filterButtons = [
    {
      name: "რეგიონი",
      label: (
        <RegionsDropdown
          data={regionsData}
          selectedRegions={selectedRegions}
          handleSelectRegion={handleSelectRegion}
        />
      ),
    },
    { name: "საფასო კატეგორია", label: <p>s</p> },
    { name: "ფართობი", label: <p>s</p> },
    { name: "საძინებლების რაოდენობა", label: <p>s</p> },
  ];

  const regionTagRenderer = () => {
    if (selectedRegions.length === 0) return;

    return (
      <Tag
        closeIcon
        onClick={() => handleRemoveRegion(selectedRegions[0])}
        style={{ cursor: "pointer" }}
      >
        {selectedRegions[0]}
      </Tag>
    );
  };

  const clearaFiltersRenderer = () => {
    if (selectedRegions.length > 0) {
      return (
        <span className={classes.clearText} onClick={clearAllFilters}>
          გასუფთავება
        </span>
      );
    }
  };

  return (
    <Flex vertical gap={32} className={classes.container}>
      <Flex vertical gap={16}>
        <Flex justify="space-between" align="center">
          <Flex
            justify="space-between"
            align="center"
            className={classes.filterDropdowns}
          >
            {filterButtons.map(({ name, label }, i) => (
              <div className={classes.dropdownWrapper} key={i}>
                <button
                  className={`${classes.btn} ${
                    activeBtn === i && classes.active
                  }`}
                  onClick={() => handleActiveDropdown(i)}
                >
                  <Flex align="center" gap={4}>
                    {name}{" "}
                    {activeBtn === i ? <IoChevronUp /> : <IoChevronDown />}
                  </Flex>
                </button>
                {activeBtn === i && (
                  <div className={classes.dropdownContent}>{label}</div>
                )}
              </div>
            ))}
          </Flex>
        </Flex>

        <Flex align="center" gap={8}>
          {regionTagRenderer()}
          {clearaFiltersRenderer()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomepageComponent;
