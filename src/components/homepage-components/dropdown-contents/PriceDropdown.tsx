import { Flex } from "antd";
import classes from "./PriceDropdown.module.scss";
import { PriceDropdownProps } from "@/types/component-types/homepageComponentProps";
import { areaData, pricesData } from "@/assets/data/home";
import CustomInput from "@/components/common/antd-components/CustomInput";
import { useState } from "react";
import { ButtonPrimary } from "@/components/common/antd-components";

const PriceDropdown: React.FC<PriceDropdownProps> = ({
  handlePriceConfirm,
  handleAreaConfirm,
  isPrice,
  priceFrom,
  priceTo,
  areaFrom,
  areaTo,
}) => {
  const isPriceFromReturner = isPrice ? priceFrom : areaFrom;

  const isPriceToReturner = isPrice ? priceTo : areaTo;

  const [chooseFrom, setChooseFrom] = useState<number | undefined>(
    () => isPriceFromReturner
  );
  const [chooseTo, setChooseTo] = useState<number | undefined>(
    isPriceToReturner
  );

  const inputStatusRenderer = () => {
    if (chooseFrom && chooseTo) {
      if (chooseTo < chooseFrom) return "error";
    }

    return "";
  };

  const handleConfirm = () => {
    if (inputStatusRenderer() === "error") return;
    if (isPrice) {
      handlePriceConfirm(chooseFrom, chooseTo);
    } else {
      handleAreaConfirm(chooseFrom, chooseTo);
    }

    setChooseFrom(undefined);
    setChooseTo(undefined);
  };

  const dataRenderer = () => {
    if (isPrice) return pricesData;

    return areaData;
  };

  return (
    <Flex vertical gap={24} className={classes.dropdown}>
      <Flex vertical gap={32}>
        <h2>{isPrice ? "ფასის" : "ფართობის"} მიხედვით</h2>

        <Flex gap={15} className={classes.pricesContent}>
          <Flex vertical gap={24}>
            <CustomInput
              placeholder="დან"
              type="number"
              onChange={(e) => setChooseFrom(Number(e.target.value))}
              value={chooseFrom}
              suffix={<span>{isPrice ? "₾" : `მ\u00B2`}</span>}
              status={inputStatusRenderer()}
            />

            {inputStatusRenderer() === "error" && (
              <span className={classes.errorMessage}>
                გთხოვთ შეიყვანოთ ვალიდური რიცხვები
              </span>
            )}

            <Flex vertical gap={16}>
              <p className={classes.priceFromTo}>
                {" "}
                მინ.{isPrice ? "ფასი" : `მ\u00B2`}
              </p>

              <Flex vertical gap={8}>
                {dataRenderer().map((e, i) => (
                  <span
                    className={classes.prices}
                    key={i}
                    onClick={() => setChooseFrom(e)}
                  >
                    {e.toLocaleString()} {isPrice ? "₾" : `მ\u00B2`}
                  </span>
                ))}
              </Flex>
            </Flex>
          </Flex>

          <Flex vertical gap={24}>
            <Flex vertical gap={16}>
              <CustomInput
                placeholder="მდე"
                type="number"
                onChange={(e) => setChooseTo(Number(e.target.value))}
                value={chooseTo}
                suffix={<span>{isPrice ? "₾" : `მ\u00B2`}</span>}
                status={inputStatusRenderer()}
              />
            </Flex>

            <Flex vertical gap={16}>
              <p className={classes.priceFromTo}>
                {" "}
                მაქს.{isPrice ? "ფაასი" : `მ\u00B2`}
              </p>

              <Flex vertical gap={8}>
                {dataRenderer().map((e, i) => (
                  <span
                    className={classes.prices}
                    key={i}
                    onClick={() => setChooseTo(e)}
                  >
                    {e.toLocaleString()} {isPrice ? "₾" : `მ\u00B2`}
                  </span>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex justify="flex-end" style={{ width: "100%" }}>
        <ButtonPrimary size="small" onClick={handleConfirm}>
          <span className={"btnText"}>არჩევა</span>
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
};

export default PriceDropdown;
