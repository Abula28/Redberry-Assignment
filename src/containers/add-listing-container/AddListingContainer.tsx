import {
  getAgents,
  GetAgentsRes,
  getCities,
  GetCitiesRes,
  getRegions,
  GetRegionsRes,
  postAgents,
} from "@/api";
import AddListingComponent from "@/components/add-listing-components/AddListingComponent";
import Loading from "@/components/common/Loading";
import useMessages from "@/hooks/useMessages";
import { AddListingComponentProps } from "@/types";
import { useEffect, useState } from "react";

const AddListingContainer = () => {
  const [radioValue, setRadioValue] = useState<1 | 0>(1);
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
  const [agentsData, setAgentsData] = useState<GetAgentsRes[]>();

  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedAgent, setSelectedAgent] = useState<string>();

  const [agentImageValue, setAgentImageValue] = useState<File | null>(null);
  const [imageValue, setImageValue] = useState<File | null>(null);
  const [agentValues, setAgentValues] = useState<{
    name: string;
    surname: string;
    email: string;
    phone: string;
  }>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const { error, success, contextHolder } = useMessages();
  const [nameError, setNameError] = useState<boolean>(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [imageError, setAgentImageError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

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
    const hasError = errorHandler();
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
  };

  return (
    <>
      {contextHolder}
      <AddListingComponent {...props} />;
    </>
  );
};

export default AddListingContainer;
