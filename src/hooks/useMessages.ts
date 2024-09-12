import { message } from "antd";

const useMessages = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };
  const success = (content: string) => {
    messageApi.open({
      type: "success",
      content,
    });
  };
  return {
    error,
    success,
    contextHolder,
  };
};

export default useMessages;
