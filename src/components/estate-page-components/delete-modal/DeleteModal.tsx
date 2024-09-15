import { Flex, Modal, ModalProps } from "antd";
import React from "react";
import classes from "./DeleteModal.module.scss";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@/components/common/antd-components";

const DeleteModal: React.FC<ModalProps> = ({ open, onOk, onCancel }) => {
  return (
    <Modal open={open} footer={null} width={623} onCancel={onCancel}>
      <Flex justify="center" align="center">
        <Flex vertical gap={35}>
          <p className={classes.warning}>გსურთ წაშალოთ ლისტინგი?</p>

          <Flex gap={15} align="center">
            <ButtonSecondary onClick={onCancel}>გაუქმება</ButtonSecondary>
            <ButtonPrimary onClick={onOk}>დადასტურება</ButtonPrimary>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteModal;
