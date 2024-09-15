import { EstateCardProps } from "@/types/component-types/homepageComponentProps";
import React from "react";

import classes from "./EstateCard.module.scss";
import { Flex } from "antd";
import { formatNumber } from "@/lib";
import { AddressIcon, AreaIcon, BedIcon, MarkIcon } from "@/assets";
import { Link } from "react-router-dom";
import { RentTag } from "@/components/common/antd-components";

const EstateCard: React.FC<EstateCardProps> = ({
  id,
  address,
  image,
  zip_code,
  price,
  area,
  bedrooms,
  is_rental,
  city,
}) => {
  return (
    <div className={classes.estateCard}>
      <Link to={`/estate/${id}`}>
        <RentTag bordered={false} className={`"rentTag" ${classes.tag}`}>
          <span className={"rentTagText"}>
            {is_rental ? "ქირავდება" : "იყიდება"}
          </span>
        </RentTag>
        <img src={image} alt={`img-${id}`} width={384} height={307} />
        <Flex className={classes.cardInfo} vertical gap={20}>
          <Flex vertical gap={6}>
            <h2>{formatNumber(price)} ₾</h2>
            <Flex gap={4} align="center">
              <MarkIcon />{" "}
              <p>
                {city.name}, {address}
              </p>
            </Flex>
          </Flex>

          <Flex gap={20} align="center">
            <Flex align="center" gap={5}>
              <BedIcon /> <p>{bedrooms}</p>
            </Flex>

            <Flex align="center" gap={5}>
              <AreaIcon /> <p>{area} მ&sup2;</p>
            </Flex>

            <Flex align="center" gap={5}>
              <AddressIcon /> <p>{zip_code}</p>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default EstateCard;
