import { ConfigProvider, Flex, Spin } from "antd";
import classes from "./Loading.module.scss";

const Loading = () => {
  const loadingStyles = {
    components: {
      Spin: {
        colorPrimary: "rgb(249,59,29)",
      },
    },
  };
  return (
    <Flex className={classes.loading} justify="center" align="center">
      <ConfigProvider theme={loadingStyles}>
        <Spin size="large" />
      </ConfigProvider>
    </Flex>
  );
};

export default Loading;
