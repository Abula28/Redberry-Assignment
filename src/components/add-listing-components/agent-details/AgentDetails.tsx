import Select from "@/components/common/custom-components/Select";
import { Flex } from "antd";
import React from "react";
import classes from "../AddListingComponent.module.scss";
import { AgentDetailsProps } from "@/types";
import { PlusIconCircle } from "@/assets";
import AgentModal from "@/components/homepage-components/agent-modal/AgentModal";

const AgentDetails: React.FC<AgentDetailsProps> = ({
  agentsSelectData,
  agentImageValue,
  agentValues,
  modalErrors,
  modalOpen,
  selectOpen,
  agentError,
  selectedAgent,
  handleAgentImageChange,
  handleSelectAgent,
  handleInputsChange,
  handleAgentConfirm,
  handleModalClose,
  handleModalOpen,
  handleSelectOpen,
}) => {
  return (
    <>
      <AgentModal
        open={modalOpen}
        onClose={handleModalClose}
        onOk={handleAgentConfirm}
        agentValues={agentValues}
        imgValue={agentImageValue}
        nameError={modalErrors.nameError}
        surnameError={modalErrors.surnameError}
        emailError={modalErrors.emailError}
        phoneError={modalErrors.phoneError}
        imageError={modalErrors.imageError}
        handleIputsChange={handleInputsChange}
        handleImgChange={handleAgentImageChange}
      />
      <Flex vertical gap={15} className={`${classes.inputContainer} w-full`}>
        <h2>აგენტი</h2>
        <Flex vertical gap={5}>
          <label>აირჩიე</label>
          <Select
            open={selectOpen}
            optionRender={
              <Flex align="center" gap={8} onClick={handleModalOpen}>
                <PlusIconCircle /> დაამატე აგენტი
              </Flex>
            }
            options={agentsSelectData}
            text={"აირჩიეთ აგენტი"}
            value={selectedAgent}
            onChange={handleSelectAgent}
            handleOpen={handleSelectOpen}
            error={agentError && !selectedAgent}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default AgentDetails;
