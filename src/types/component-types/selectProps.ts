import { SelectOptionsT } from "../common-types";

export type SelectProps = {
  text: string;
  className?: string;
  buttonClassName?: string;
  open?: boolean;
  handleOpen?: (e: boolean) => void;
  onChange?: (value: string) => void;
  options: SelectOptionsT[];
  value?: string;
  optionRender?: React.ReactNode;
  error?: boolean;
};
