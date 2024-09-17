import { ConfigProvider, Input, InputProps } from "antd";
import React from "react";

const CustomInput: React.FC<InputProps> = (props) => {
  const inputStyles = {
    Input: {
      hoverBorderColor: "rgb(128,138,147)",
      activeBorderColor: "rgb(128,138,147)",
      colorError: "rgb(249,59,29)",
    },
  };
  return (
    <ConfigProvider theme={{ components: inputStyles }}>
      <Input {...props} style={{ height: "40px" }} />
    </ConfigProvider>
  );
};

export default CustomInput;
