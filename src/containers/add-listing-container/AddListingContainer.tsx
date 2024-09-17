import { getCities, GetCitiesRes, getRegions, GetRegionsRes } from "@/api";
import AddListingComponent from "@/components/add-listing-components/AddListingComponent";
import Loading from "@/components/common/Loading";
import { AddListingComponentProps } from "@/types";
import { useEffect, useState } from "react";

const AddListingContainer = () => {
  const [radioValue, setRadioValue] = useState<1 | 0>(1);
  const [selectValue, setSelectValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<{
    address: string;
    zip_code: number;
  }>({ address: "", zip_code: 0 });
  const [houseValues, setHouseValues] = useState<{
    price: number;
    area: number;
    bedrooms: number;
  }>({ price: 0, area: 0, bedrooms: 0 });
  const [description, setDescription] = useState<string>("");

  const [regionsData, setRegionsData] = useState<GetRegionsRes[]>();
  const [citiesData, setCitiesData] = useState<GetCitiesRes[]>();
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  const getData = async () => {
    const [regData, cities] = await Promise.all([getRegions(), getCities()]);
    setRegionsData(regData);
    setCitiesData(cities);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(Number(e.target.value) as 1 | 0);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressValue((prev) => ({
      ...prev,
      [name]: name === "zip_code" ? Number(value) : value,
    }));
  };

  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setHouseValues((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSelectRegion = (value: string) => setSelectedRegion(value);
  const handleSelectCity = (value: string) => setSelectedCity(value);

  if (!regionsData || !citiesData) return <Loading />;

  const props: AddListingComponentProps = {
    radioValue,
    selectValue,
    regionsData,
    citiesData,
    selectedRegion,
    selectedCity,
    addressValue,
    houseValues,
    description,
    handleRadioChange,
    handleSelectRegion,
    handleSelectCity,
    handleAddressChange,
    handleHouseChange,
    handleDescriptionChange,
  };

  return <AddListingComponent {...props} />;
};

export default AddListingContainer;
