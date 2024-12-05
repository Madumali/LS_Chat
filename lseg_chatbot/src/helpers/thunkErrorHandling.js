import { message } from "antd";

export const handleThunkError = (error) => {
  if (error?.response?.status && error?.response?.status !== 401) {
    if (error?.response?.data?.responseHeader?.desc) {
      message.error(error?.response?.data?.responseHeader?.desc);
    } else if (error?.response?.data?.message) {
      message.error(error?.response?.data?.message);
    } else {
      message.error("Server Error occurred");
    }
  }
};
