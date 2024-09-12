import { Checkbox, CheckboxProps, ConfigProvider } from "antd";
import React from "react";

const CustomChechbox: React.FC<CheckboxProps> = (props) => {
  const chechboxStyles = {
    Checkbox: {
      colorPrimary: "rgb(69,168,73)",
      colorPrimaryHover: "rgba(69,168,72,0.83)",
      controlInteractiveSize: 20,
    },
  };
  return (
    <ConfigProvider theme={{ components: chechboxStyles }}>
      <Checkbox {...props} />
    </ConfigProvider>
  );
};

export default CustomChechbox;
