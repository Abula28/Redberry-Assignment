import { Button, ButtonProps, ConfigProvider } from "antd";
import React from "react";

const buttonStyles = {
  Button: {
    colorPrimary: "rgb(249,59,29)",
    colorPrimaryActive: "rgb(255,93,68)",
    colorPrimaryHover: "rgb(255,93,68)",
    defaultBorderColor: "rgb(249,59,29)",
    defaultColor: "rgb(249,59,29)",
    contentFontSize: 16,
    paddingBlock: 14,
    paddingInline: 16,
    paddingBlockSM: 8,
    paddingInlineSM: 14,
    borderRadius: 10,
    borderRadiusLG: 10,
    borderRadiusSM: 10,
    controlHeight: 47,
    controlHeightSM: 33,
  },
};

export const ButtonPrimary: React.FC<ButtonProps> = (props) => {
  return (
    <ConfigProvider theme={{ components: buttonStyles }}>
      <Button type="primary" {...props} />
    </ConfigProvider>
  );
};

export const ButtonSecondary: React.FC<ButtonProps> = (props) => {
  return (
    <ConfigProvider theme={{ components: buttonStyles }}>
      <Button {...props} />
    </ConfigProvider>
  );
};
