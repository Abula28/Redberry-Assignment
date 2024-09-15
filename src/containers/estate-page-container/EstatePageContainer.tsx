import {
  deleteRealEstate,
  GetEstateRes,
  getRealEstateById,
  getRealEstates,
  GetRealEstatesRes,
} from "@/api";
import Loading from "@/components/common/Loading";
import EstatePageComponent from "@/components/estate-page-components/EstatePageComponent";
import useMessages from "@/hooks/useMessages";
import { EstateComponentProps } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EstatePageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estateData, setEstateData] = useState<GetEstateRes>();
  const [swiperData, setSwiperData] = useState<GetRealEstatesRes[]>();
  const [open, setOpen] = useState<boolean>(false);
  const { error, success, contextHolder } = useMessages();
  const getData = async () => {
    let estData: GetEstateRes;
    if (id) {
      const estateData = await getRealEstateById(id);
      setEstateData(estateData);
      estData = estateData;
    }

    const data = await getRealEstates();
    const filteredData = data.filter((e) => e.city.name === estData.city.name);

    setSwiperData(filteredData);
  };
  const deleteListing = async () => {
    if (estateData) {
      try {
        await deleteRealEstate(estateData.id);
        success("ლისტინგი წარმატებით წაიშალა");
        setOpen(false);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (err) {
        error("რაღაც შეცდომაა");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!estateData || !swiperData) return <Loading />;

  const onOk = () => deleteListing();
  const onCancel = () => setOpen(false);

  const props: EstateComponentProps = {
    data: estateData,
    swiperData,
    open,
    setOpen,
    onOk,
    onCancel,
  };

  return (
    <>
      {contextHolder}
      <EstatePageComponent {...props} />;
    </>
  );
};

export default EstatePageContainer;
