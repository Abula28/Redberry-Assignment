import { GetEstateRes, GetRealEstatesRes } from "@/api";

export type EstateComponentProps = {
  data: GetEstateRes;
  swiperData: GetRealEstatesRes[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
  onCancel: () => void;
};
