import {
  getAgents,
  GetAgentsRes,
  getCities,
  GetCitiesRes,
  getRegions,
  GetRegionsRes,
  postAgents,
  postRealEstates,
} from "@/api";
import AddListingComponent from "@/components/add-listing-components/AddListingComponent";
import Loading from "@/components/common/Loading";
import useMessages from "@/hooks/useMessages";
import { AddListingComponentProps } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddListingContainer = () => {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState<1 | 0>(
    () => (Number(localStorage.getItem("radioValue")) as 1 | 0) || 1
  );
  const [addressValue, setAddressValue] = useState<{
    address: string;
    zip_code: string;
  }>(() =>
    JSON.parse(
      localStorage.getItem("addressValue") || '{"address": "", "zip_code": ""}'
    )
  );
  const [houseValues, setHouseValues] = useState<{
    price: number;
    area: number;
    bedrooms: number;
  }>(() =>
    JSON.parse(
      localStorage.getItem("houseValues") ||
        '{"price": 0, "area": 0, "bedrooms": 0}'
    )
  );
  const [description, setDescription] = useState<string>(
    () => localStorage.getItem("description") || ""
  );

  const [regionsData, setRegionsData] = useState<GetRegionsRes[]>();
  const [citiesData, setCitiesData] = useState<GetCitiesRes[]>();
  const [agentsData, setAgentsData] = useState<GetAgentsRes[]>();

  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => localStorage.getItem("selectedRegion") || ""
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    () => localStorage.getItem("selectedCity") || ""
  );
  const [selectedAgent, setSelectedAgent] = useState<string>(
    () => localStorage.getItem("selectedAgent") || ""
  );

  const [agentImageValue, setAgentImageValue] = useState<File | null>(null);
  const [imageValue, setImageValue] = useState<File | null>(null);
  const [agentValues, setAgentValues] = useState<{
    name: string;
    surname: string;
    email: string;
    phone: string;
  }>(() =>
    JSON.parse(
      localStorage.getItem("agentValues") ||
        '{"name": "", "surname": "", "email": "", "phone": ""}'
    )
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [imageError, setAgentImageError] = useState<boolean>(false);

  const [addressError, setAddressError] = useState<boolean>(false);
  const [zipCodeError, setZipCodeError] = useState<boolean>(false);
  const [regionError, setRegionError] = useState<boolean>(false);
  const [cityError, setCityError] = useState<boolean>(false);
  const [priceError, setPriceDataError] = useState<boolean>(false);
  const [areaError, setAreaDataError] = useState<boolean>(false);
  const [bedroomsError, setBedroomsDataError] = useState<boolean>(false);
  const [descriptionError, setDescriptionDataError] = useState<boolean>(false);
  const [listingImageError, setListingImageDataError] =
    useState<boolean>(false);
  const [agentError, setAgentError] = useState<boolean>(false);

  const { error, success, contextHolder } = useMessages();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("radioValue", String(radioValue));
    localStorage.setItem("addressValue", JSON.stringify(addressValue));
    localStorage.setItem("houseValues", JSON.stringify(houseValues));
    localStorage.setItem("description", description);
    localStorage.setItem("selectedRegion", selectedRegion || "");
    localStorage.setItem("selectedCity", selectedCity || "");
    localStorage.setItem("selectedAgent", selectedAgent || "");
    localStorage.setItem("agentValues", JSON.stringify(agentValues));
  }, [
    radioValue,
    addressValue,
    houseValues,
    description,
    selectedRegion,
    selectedCity,
    selectedAgent,
    agentValues,
  ]);

  const getData = async () => {
    const [regData, cities, agents] = await Promise.all([
      getRegions(),
      getCities(),
      getAgents(),
    ]);
    setRegionsData(regData);
    setCitiesData(cities);
    setAgentsData(agents);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(Number(e.target.value) as 1 | 0);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressValue((prev) => ({
      ...prev,
      [name]: value,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageValue(e.target.files[0]);
    }
  };

  const handleAgentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAgentImageValue(e.target.files[0]);
    }
  };

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAgentValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectRegion = (value: string) => setSelectedRegion(value);
  const handleSelectCity = (value: string) => setSelectedCity(value);
  const handleSelectAgent = (value: string) => setSelectedAgent(value);

  const errorHandler = () => {
    let hasError = false;
    if (addressValue.address.trim().length < 2) {
      setAddressError(true);
      hasError = true;
    } else {
      setAddressError(false);
    }
    if (Number(addressValue.zip_code) <= 0) {
      setZipCodeError(true);
      hasError = true;
    } else {
      setZipCodeError(false);
    }

    if (!selectedRegion) {
      setRegionError(true);
      hasError = true;
    } else {
      setRegionError(false);
    }

    if (!selectedCity) {
      setCityError(true);
      hasError = true;
    } else {
      setCityError(false);
    }

    if (houseValues.price <= 0) {
      setPriceDataError(true);
      hasError = true;
    } else {
      setPriceDataError(false);
    }

    if (houseValues.area <= 0) {
      setAreaDataError(true);
      hasError = true;
    } else {
      setAreaDataError(false);
    }

    if (houseValues.bedrooms <= 0) {
      setBedroomsDataError(true);
      hasError = true;
    } else {
      setBedroomsDataError(false);
    }

    if (description.trim().split(" ").length < 5) {
      setDescriptionDataError(true);
      hasError = true;
    } else {
      setDescriptionDataError(false);
    }

    if (!imageValue) {
      setListingImageDataError(true);
      hasError = true;
    } else {
      setListingImageDataError(false);
    }

    if (!selectedAgent) {
      setAgentError(true);
      hasError = true;
    } else {
      setAgentError(false);
    }

    return hasError;
  };

  const clearValues = () => {
    setRadioValue(1);
    setAddressValue({ address: "", zip_code: "" });
    setHouseValues({ price: 0, area: 0, bedrooms: 0 });
    setDescription("");
    setImageValue(null);
    setAgentImageValue(null);
    setAgentValues({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    setSelectOpen(false);
    setModalOpen(false);
    setAgentError(false);
    setAddressError(false);
    setZipCodeError(false);
    setRegionError(false);
    setCityError(false);
    setPriceDataError(false);
    setAreaDataError(false);
    setBedroomsDataError(false);
    setDescriptionDataError(false);
    setListingImageDataError(false);
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    localStorage.clear();
  };

  const agentModalErrorHandler = () => {
    let hasError = false;
    if (agentValues.name.trim().length < 2) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (agentValues.surname.trim().length < 2) {
      setSurnameError(true);
      hasError = true;
    } else {
      setSurnameError(false);
    }

    if (!agentValues.email.endsWith("@redberry.ge")) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (
      !/^\d+$/.test(agentValues.phone) ||
      agentValues.phone.split("")[0] !== "5" ||
      agentValues.phone.length < 9 ||
      agentValues.phone.length > 9
    ) {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }

    if (!agentImageValue) {
      setAgentImageError(true);
      hasError = true;
    } else {
      setAgentImageError(false);
    }

    return hasError;
  };

  const handleConfirm = async () => {
    const hasError = agentModalErrorHandler();
    if (hasError || !agentImageValue) {
      return;
    }

    try {
      const data = {
        name: agentValues.name,
        surname: agentValues.surname,
        email: agentValues.email,
        phone: agentValues.phone,
        avatar: agentImageValue,
      };

      await postAgents(data);

      success("აგენტი წარმატებით დაემატა");
      setModalOpen(false);
      getData();
    } catch (err) {
      error("რაღაც შეცდომაა");
    }
  };

  const handleModalClose = () => {
    setAgentValues({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    setAgentImageValue(null);
    setAgentImageError(false);
    setModalOpen(false);
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPhoneError(false);
    setAgentImageError(false);
    setModalOpen(false);
    setSelectOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleSelectOpen = (e: boolean) => setSelectOpen(e);
  const handleSubmit = async () => {
    try {
      const hasError = errorHandler();
      if (hasError || !imageValue) {
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("region_id", String(selectedRegion));
      formData.append("agent_id", String(selectedAgent));
      formData.append("image", imageValue);
      formData.append("is_rental", String(radioValue));
      formData.append("city_id", String(selectedCity));
      formData.append("address", addressValue.address);
      formData.append("zip_code", addressValue.zip_code);
      formData.append("price", String(houseValues.price));
      formData.append("area", String(houseValues.area));
      formData.append("bedrooms", String(houseValues.bedrooms));

      const data: any = formData;

      await postRealEstates(data);
      clearValues();

      setTimeout(() => {
        navigate("/");
      }, 2000);
      success("ლისტინგი წარმატებით დაემატა");
    } catch (e) {
      error("რაღაც შეცდომაა");
    }
  };

  if (!regionsData || !citiesData || !agentsData) return <Loading />;

  const modalErrors = {
    nameError,
    surnameError,
    emailError,
    phoneError,
    imageError,
  };

  const props: AddListingComponentProps = {
    radioValue,
    regionsData,
    citiesData,
    selectedRegion,
    selectedCity,
    addressValue,
    houseValues,
    description,
    imageValue,
    agentImageValue,
    agentsData,
    selectedAgent,
    agentValues,
    modalErrors,
    modalOpen,
    selectOpen,
    addressError,
    zipCodeError,
    regionError,
    cityError,
    priceError,
    areaError,
    bedroomsError,
    descriptionError,
    listingImageError,
    agentError,
    handleRadioChange,
    handleSelectRegion,
    handleSelectCity,
    handleAddressChange,
    handleHouseChange,
    handleDescriptionChange,
    handleImageChange,
    handleAgentImageChange,
    handleSelectAgent,
    handleInputsChange,
    handleAgentConfirm: handleConfirm,
    handleModalClose,
    handleModalOpen,
    handleSelectOpen,
    handleSubmit,
    clearValues,
  };

  return (
    <>
      {contextHolder}
      <AddListingComponent {...props} />;
    </>
  );
};

export default AddListingContainer;
