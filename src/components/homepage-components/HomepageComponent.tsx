import { Flex } from "antd";
import classes from "./HomepageComponent.module.scss";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HompageComponentProps } from "@/types/component-types/homepageComponentProps";
import RegionsDropdown from "./dropdown-contents/RegionsDropdown";
import PriceDropdown from "./dropdown-contents/PriceDropdown";
import FilterTag from "../common/antd-components/FilterTag";
import BedsDropdown from "./dropdown-contents/BedsDropdown";

const HomepageComponent: React.FC<HompageComponentProps> = ({
  estatesData,
  regionsData,
  activeBtn,
  selectedRegions,
  priceFrom,
  priceTo,
  areaFrom,
  areaTo,
  bedsValue,
  handleSelectRegion,
  handleActiveDropdown,
  handleRemoveRegion,
  handleAreaConfirm,
  clearAllFilters,
  handlePriceConfirm,
  handleBedsConfirm,
  handleRemoveareaRange,
  handleRemoveBeds,
  handleRemovePricesRange,
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
    {
      name: "საფასო კატეგორია",
      label: (
        <PriceDropdown
          handlePriceConfirm={handlePriceConfirm}
          handleAreaConfirm={handleAreaConfirm}
          isPrice
          priceFrom={priceFrom}
          priceTo={priceTo}
          areaFrom={areaFrom}
          areaTo={areaTo}
        />
      ),
    },
    {
      name: "ფართობი",
      label: (
        <PriceDropdown
          handlePriceConfirm={handlePriceConfirm}
          handleAreaConfirm={handleAreaConfirm}
          priceFrom={priceFrom}
          priceTo={priceTo}
          areaFrom={areaFrom}
          areaTo={areaTo}
        />
      ),
    },
    {
      name: "საძინებლების რაოდენობა",
      label: (
        <BedsDropdown
          handleBedsConfirm={handleBedsConfirm}
          bedsValue={bedsValue}
        />
      ),
    },
  ];

  const regionTagRenderer = () => {
    if (selectedRegions.length === 0) return;

    return (
      <FilterTag
        onClose={(e) => {
          e.preventDefault();
          handleRemoveRegion(selectedRegions[0]);
        }}
        closeIcon
        style={{ cursor: "pointer" }}
      >
        <span className={classes.filterTagText}>{selectedRegions[0]}</span>
      </FilterTag>
    );
  };

  const priceTagRenderer = () => {
    if (!priceFrom || !priceTo) return;
    if (priceTo < priceFrom) return;

    if (priceFrom && !priceTo)
      return (
        <FilterTag
          onClose={(e) => {
            e.preventDefault();
            handleRemovePricesRange();
          }}
          closeIcon
          style={{ cursor: "pointer" }}
        >
          <span className={classes.filterTagText}>
            {priceFrom.toLocaleString()} {">"}
          </span>
        </FilterTag>
      );

    return (
      <FilterTag
        onClose={(e) => {
          e.preventDefault();
          handleRemovePricesRange();
        }}
        closeIcon
        style={{ cursor: "pointer" }}
      >
        <span className={classes.filterTagText}>
          {priceFrom.toLocaleString()} ₾ - {priceTo.toLocaleString()} ₾
        </span>
      </FilterTag>
    );
  };

  const areaTagRenderer = () => {
    if (!areaFrom || !areaTo) return;
    if (areaTo < areaFrom) return;

    if (areaFrom && !areaTo)
      return (
        <FilterTag
          onClose={(e) => {
            e.preventDefault();
            handleRemoveareaRange();
          }}
          closeIcon
          style={{ cursor: "pointer" }}
        >
          <span className={classes.filterTagText}>
            {areaFrom.toLocaleString()} {">"}
          </span>
        </FilterTag>
      );

    return (
      <FilterTag
        onClose={(e) => {
          e.preventDefault();
          handleRemovePricesRange();
        }}
        closeIcon
        style={{ cursor: "pointer" }}
      >
        <span className={classes.filterTagText}>
          {areaFrom.toLocaleString()} მ&sup2; - {areaTo.toLocaleString()}{" "}
          მ&sup2;
        </span>
      </FilterTag>
    );
  };

  const bedsTagRenderer = () => {
    if (!bedsValue) return;

    return (
      <FilterTag
        onClose={(e) => e.preventDefault()}
        closeIcon
        onClick={handleRemoveBeds}
        style={{ cursor: "pointer" }}
      >
        <span className={classes.filterTagText}>{bedsValue}</span>
      </FilterTag>
    );
  };

  const clearaFiltersRenderer = () => {
    if (
      selectedRegions.length > 0 ||
      priceFrom ||
      priceTo ||
      areaFrom ||
      areaTo ||
      bedsValue
    ) {
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
          {priceTagRenderer()}
          {areaTagRenderer()}
          {bedsTagRenderer()}
          {clearaFiltersRenderer()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomepageComponent;
