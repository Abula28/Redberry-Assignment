import { AgentModalProps } from "@/types/component-types/homepageComponentProps";
import { Flex, Modal } from "antd";
import React from "react";
import classes from "./AgentModal.module.scss";
import CustomInput from "@/components/common/antd-components/CustomInput";
import { PlusIconCircle } from "@/assets";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@/components/common/antd-components";

const AgentModal: React.FC<AgentModalProps> = ({
  open,
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
}) => {
  return (
    <Modal
      open={open}
      centered
      footer={null}
      className={classes.agentModal}
      width={1009}
      onCancel={onClose}
    >
      <Flex justify="center" align="center">
        <Flex
          dir="column"
          align="center"
          vertical
          gap={61}
          style={{ width: "100%" }}
        >
          <h2 className={classes.header}>აგენტის დამატება</h2>

          <Flex vertical gap={91} style={{ width: "100%" }}>
            <Flex vertical gap={28} style={{ width: "100%" }}>
              <Flex gap={31} style={{ width: "100%" }}>
                <Flex vertical gap={5} style={{ width: "100%" }}>
                  <label>სახელი*</label>
                  <CustomInput
                    className={classes.input}
                    type="text"
                    name="name"
                    onChange={handleIputsChange}
                    value={agentValues.name}
                    status={nameError ? "error" : undefined}
                  />
                  <p
                    className={`${classes.requiredText} ${
                      nameError && classes.error
                    } ${
                      agentValues.name.trim().length >= 2 && classes.success
                    }`}
                  >
                    &#x2713; მინიმუმ ორი სიმბოლო
                  </p>
                </Flex>

                <Flex vertical gap={5} style={{ width: "100%" }}>
                  <label>გვარი*</label>
                  <CustomInput
                    className={classes.input}
                    type="text"
                    name="surname"
                    value={agentValues.surname}
                    onChange={handleIputsChange}
                    status={surnameError ? "error" : undefined}
                  />

                  <p
                    className={`${classes.requiredText} ${
                      surnameError && classes.error
                    } ${
                      agentValues.surname.trim().length >= 2 && classes.success
                    }`}
                  >
                    &#x2713; მინიმუმ ორი სიმბოლო
                  </p>
                </Flex>
              </Flex>

              <Flex gap={31} style={{ width: "100%" }}>
                <Flex vertical gap={5} style={{ width: "100%" }}>
                  <label>ელ-ფოსტა*</label>
                  <CustomInput
                    className={classes.input}
                    type="mail"
                    name="email"
                    value={agentValues.email}
                    onChange={handleIputsChange}
                    status={emailError ? "error" : undefined}
                  />

                  <p
                    className={`${classes.requiredText} ${
                      emailError && classes.error
                    } ${
                      agentValues.email.endsWith("@redberry.ge") &&
                      classes.success
                    }`}
                  >
                    &#x2713; გამოიყენეთ @redberry.ge ფოსტა
                  </p>
                </Flex>

                <Flex vertical gap={5} style={{ width: "100%" }}>
                  <label>ტელეფონის ნომერი*</label>
                  <CustomInput
                    className={classes.input}
                    type="number"
                    name="phone"
                    value={agentValues.phone}
                    onChange={handleIputsChange}
                    status={phoneError ? "error" : undefined}
                  />

                  <p
                    className={`${classes.requiredText} ${
                      phoneError && classes.error
                    } ${
                      agentValues.phone.split("")[0] === "5" && classes.success
                    }`}
                  >
                    &#x2713; უნდა იყოს ` 5XXXXXXXX ` ფორმატის
                  </p>

                  <p
                    className={`${classes.requiredText} ${
                      phoneError && classes.error
                    } ${
                      /^\d+$/.test(agentValues.phone) ? classes.success : ""
                    }`}
                  >
                    &#x2713; მხოლოდ რიცხვები
                  </p>

                  <p
                    className={`${classes.requiredText} ${
                      phoneError && agentValues.phone.length !== 9
                        ? classes.error
                        : ""
                    } ${agentValues.phone.length === 9 && classes.success}`}
                  >
                    &#x2713; უნდა იყოს 9 სიმბოლოიანი
                  </p>
                </Flex>
              </Flex>

              <Flex vertical gap={5}>
                <label>დაამატე ფოტო*</label>

                <div
                  className={`${classes.photoInput} ${
                    imageError && classes.error
                  }`}
                >
                  <Flex
                    justify="center"
                    align="center"
                    className={classes.inputWrapper}
                  >
                    <PlusIconCircle />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImgChange}
                    />
                  </Flex>
                  {imgValue && (
                    <img
                      src={URL.createObjectURL(imgValue)}
                      alt="prev-img"
                      className={classes.prevImg}
                    />
                  )}
                </div>
                {imageError && (
                  <p className={`${classes.requiredText} ${classes.error}`}>
                    დაამატეთ ფოტო
                  </p>
                )}
              </Flex>
            </Flex>

            <Flex style={{ width: "100%" }} justify="flex-end">
              <Flex align="center" gap={15}>
                <ButtonSecondary onClick={onClose}>
                  <span className="btnText">გაუქმება</span>
                </ButtonSecondary>
                <ButtonPrimary onClick={onOk}>
                  <span className="btnText">დაამატე აგენტი</span>
                </ButtonPrimary>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AgentModal;
