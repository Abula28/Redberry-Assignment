import { ConfigProvider, Tag, TagProps } from "antd";
import React from "react";

export const FilterTag: React.FC<TagProps> = (props) => {
  const tagStyles = {
    Tag: {
      defaultBg: "rgba(255,255,255,0.99)",
      defaultColor: "rgba(2,21,38,0.88)",
      colorBorder: "rgb(219,219,219)",
      borderRadiusSM: 43,
      paddingXXS: 10,
      marginXS: 0,
    },
  };

  return (
    <ConfigProvider theme={{ components: tagStyles }}>
      <Tag {...props}>{props.children}</Tag>
    </ConfigProvider>
  );
};

export const RentTag: React.FC<TagProps> = (props) => {
  const tagStyles = {
    Tag: {
      defaultBg: "rgba(2,21,38,0.5)",
      defaultColor: "rgba(255,255,255,0.88)",
      fontSize: 12,
      borderRadiusSM: 15,
      marginXS: 0,
      paddingXXS: 0,
    },
  };

  return (
    <ConfigProvider theme={{ components: tagStyles }}>
      <Tag {...props}>{props.children}</Tag>
    </ConfigProvider>
  );
};
