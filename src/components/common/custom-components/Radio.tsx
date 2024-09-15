import { RadioProps } from "@/types/common-types";
import { Flex } from "antd";
import classes from "./Radio.module.scss";

export const Radio: React.FC<RadioProps> = ({
  value,
  onChange,
  text,
  className,
  checked,
}) => {
  return (
    <Flex
      gap={7}
      align="center"
      className={`${className ? className : ""} ${classes.customRadio}`}
    >
      <input type="radio" value={value} onChange={onChange} checked={checked} />
      <span className={classes.customRadioText}>{text}</span>
    </Flex>
  );
};
