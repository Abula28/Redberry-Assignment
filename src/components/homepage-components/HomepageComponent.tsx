import { Flex } from "antd";
import classes from "./HomepageComponent.module.scss";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { HompageComponentProps } from "@/types/component-types/homepageComponentProps";
import RegionsDropdown from "./dropdown-contents/RegionsDropdown";
import PriceDropdown from "./dropdown-contents/PriceDropdown";
import { FilterTag } from "../common/antd-components/CustomTags";
import BedsDropdown from "./dropdown-contents/BedsDropdown";
import { ButtonPrimary, ButtonSecondary } from "../common/antd-components";
import { PlusIcon, PlusIconColored } from "@/assets";
import EstateCard from "./estate-card/EstateCard";
import AgentModal from "./agent-modal/AgentModal";
import { Link } from "react-router-dom";

const HomepageComponent: React.FC<HompageComponentProps> = ({
  regionsData,
  activeBtn,
  selectedRegions,
  priceFrom,
  priceTo,
  areaFrom,
  areaTo,
  bedsValue,
  activeBtnRef,
  open,
  agentValues,
  imgValue,
  nameError,
  surnameError,
  emailError,
  phoneError,
  imageError,
  setOpen,
  handleIputsChange,
  handleImgChange,
  onOk,
  onClose,
  filteredData,
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

  const dataRenderer = () => {
    if (filteredData().length === 0)
      return (
        <p className={classes.notFound}>
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      );

    return filteredData().map((e) => <EstateCard {...e} key={e.id} />);
  };

  const modalProps = {
    onClose,
    onOk,
    handleIputsChange,
    handleImgChange,
    agentValues,
    imgValue,
    nameError,
    surnameError,
    emailError,
    phoneError,
    imageError,
    open,
  };

  return (
    <>
      <AgentModal {...modalProps} />
      <Flex vertical gap={77} className={classes.container}>
        <Flex justify="space-between" align="center">
          <Flex vertical gap={32}>
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
                        ref={activeBtnRef}
                      >
                        <Flex align="center" gap={4}>
                          {name}{" "}
                          {activeBtn === i ? (
                            <IoChevronUp />
                          ) : (
                            <IoChevronDown />
                          )}
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

          <Flex align="center" gap={16}>
            <ButtonPrimary>
              <Link to={"/add-listing"}>
                <Flex align="center" gap={2}>
                  <PlusIcon />
                  <span className="btnText">ლისტინგის დამატება</span>
                </Flex>
              </Link>
            </ButtonPrimary>

            <ButtonSecondary onClick={() => setOpen(true)}>
              <Flex align="center" gap={2}>
                <PlusIconColored />
                <span className="btnText">აგენტის დამატება</span>
              </Flex>
            </ButtonSecondary>
          </Flex>
        </Flex>

        <Flex gap={20} wrap className={classes.estates}>
          {dataRenderer()}
        </Flex>
      </Flex>
    </>
  );
};

export default HomepageComponent;
