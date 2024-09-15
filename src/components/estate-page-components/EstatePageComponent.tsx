import { Flex } from "antd";
import classes from "./EstatePageComponent.module.scss";
import React, { useState } from "react";
import { EstateComponentProps } from "@/types";
import { useNavigate } from "react-router";
import {
  AddressIcon,
  AreaIcon,
  ArrowLeftIcon30,
  ArrowLeftIcon32,
  ArrowRightIcon30,
  BedIcon,
  MailIcon,
  MarkIcon,
  PhoneIcon,
} from "@/assets";
import { ButtonSecondary, RentTag } from "../common/antd-components";
import DeleteModal from "./delete-modal/DeleteModal";
import { SwiperSlide, Swiper, SwiperClass } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import EstateCard from "../homepage-components/estate-card/EstateCard";

const EstatePageComponent: React.FC<EstateComponentProps> = ({
  data,
  swiperData,
  open,
  setOpen,
  onOk,
  onCancel,
}) => {
  const navigate = useNavigate();
  const {
    is_rental,
    image,
    price,
    address,
    area,
    city,
    bedrooms,
    zip_code,
    description,
    agent,
  } = data;

  const [my_swiper, set_my_swiper] = useState<SwiperClass>();

  return (
    <>
      <DeleteModal open={open} onCancel={onCancel} onOk={onOk} closable />
      <Flex vertical gap={53} className={classes.section}>
        <Flex vertical gap={29}>
          <div onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
            <ArrowLeftIcon32 />
          </div>
          <Flex gap={68}>
            <div className={classes.imgSide}>
              <RentTag bordered={false} className={`"rentTag" ${classes.tag}`}>
                <span className="rentTagText">
                  {is_rental ? "ქირავდება" : "იყიდება"}
                </span>
              </RentTag>
              <img src={image} alt="img" />
            </div>

            <Flex vertical gap={40} className={classes.infoSide}>
              <Flex vertical gap={24}>
                <h2 className={classes.price}>{price.toLocaleString()} ₾</h2>

                <Flex vertical gap={16}>
                  <Flex align="center" gap={4}>
                    <MarkIcon />
                    <p className={classes.estateInfo}>
                      {city.name}, {address}
                    </p>
                  </Flex>

                  <Flex align="center" gap={4}>
                    <AreaIcon />
                    <p className={classes.estateInfo}>ფართი {area} მ&sup2;</p>
                  </Flex>

                  <Flex align="center" gap={4}>
                    <BedIcon />
                    <p className={classes.estateInfo}>საძინებელი {bedrooms}</p>
                  </Flex>

                  <Flex align="center" gap={4}>
                    <AddressIcon />
                    <p className={classes.estateInfo}>
                      საფოსტო ინდექსი {zip_code}
                    </p>
                  </Flex>
                </Flex>
              </Flex>

              <p className={classes.description}>{description}</p>

              <Flex vertical gap={20}>
                <div className={classes.agentCard}>
                  <Flex vertical gap={16}>
                    <Flex align="center" gap={14}>
                      <img
                        src={agent.avatar}
                        alt="agent-img"
                        width={72}
                        height={72}
                      />

                      <Flex vertical gap={4}>
                        <h3>{agent.name}</h3>
                        <p>აგენტი</p>
                      </Flex>
                    </Flex>

                    <Flex vertical gap={4}>
                      <Flex align="center" gap={5}>
                        <MailIcon /> <p>{agent.email}</p>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <PhoneIcon /> <p>{agent.phone}</p>
                      </Flex>
                    </Flex>
                  </Flex>
                </div>

                <ButtonSecondary
                  className={classes.btn}
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  ლისტინგის წაშლა
                </ButtonSecondary>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex vertical gap={52}>
          <h2 className={classes.swiperHeadText}>ბინები მსგავს ლოკაციაზე</h2>

          <div className={classes.swiperContainer}>
            <div
              className={classes.swipeLeft}
              onClick={() => {
                if (my_swiper) {
                  my_swiper.slidePrev();
                }
              }}
            >
              <ArrowLeftIcon30 />
            </div>

            <div
              className={classes.swipeRight}
              onClick={() => {
                if (my_swiper) {
                  my_swiper.slideNext();
                }
              }}
            >
              <ArrowRightIcon30 />
            </div>

            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={4}
              onInit={(ev) => {
                set_my_swiper(ev);
              }}
              loop={swiperData.length > 4}
            >
              {swiperData.map((e) => (
                <SwiperSlide key={e.id}>
                  <EstateCard {...e} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default EstatePageComponent;
