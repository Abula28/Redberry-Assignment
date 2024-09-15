import { PostAgentsReq } from "@/api";
import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";
import { getRealEstates, getRegions, postAgents } from "@/api/services";
import Loading from "@/components/common/Loading";
import HomepageComponent from "@/components/homepage-components/HomepageComponent";
import {
  AgentValuesT,
  HompageComponentProps,
} from "@/types/component-types/homepageComponentProps";
import { debounce } from "lodash";
import { useState, useEffect, useRef, useCallback } from "react";

const HomepageContainer = () => {
  // ========== States and Refs ========== //
  const [estatesData, setEstatesData] = useState<GetRealEstatesRes[]>();
  const [regionsData, setRegionsData] = useState<GetRegionsRes[]>();
  const [activeBtn, setActiveBtn] = useState<number>();

  const [selectedRegions, setSelectedRegions] = useState<string[]>(() => {
    const savedRegions = localStorage.getItem("selectedRegions");
    return savedRegions ? JSON.parse(savedRegions) : [];
  });
  const [priceFrom, setPriceFrom] = useState<number | undefined>(() => {
    const savedPriceFrom = localStorage.getItem("priceFrom");
    return savedPriceFrom ? Number(savedPriceFrom) : undefined;
  });
  const [priceTo, setPriceTo] = useState<number | undefined>(() => {
    const savedPriceTo = localStorage.getItem("priceTo");
    return savedPriceTo ? Number(savedPriceTo) : undefined;
  });
  const [areaFrom, setAreaFrom] = useState<number | undefined>(() => {
    const savedAreaFrom = localStorage.getItem("areaFrom");
    return savedAreaFrom ? Number(savedAreaFrom) : undefined;
  });
  const [areaTo, setAreaTo] = useState<number | undefined>(() => {
    const savedAreaTo = localStorage.getItem("areaTo");
    return savedAreaTo ? Number(savedAreaTo) : undefined;
  });
  const [bedsValue, setBedsValue] = useState<number | undefined>(() => {
    const savedBedsValue = localStorage.getItem("bedsValue");
    return savedBedsValue ? Number(savedBedsValue) : undefined;
  });

  const activeDropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [agentValues, setAgentValues] = useState<AgentValuesT>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [imgValue, setImgValue] = useState<File | null>(null);

  const [nameError, setNameError] = useState<boolean>(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // ========== Backend Logics ========== //

  const getData = async () => {
    const realEstates = await getRealEstates();
    const regions = await getRegions();

    setEstatesData(realEstates);
    setRegionsData(regions);
  };

  const createAgents = async (data: PostAgentsReq) => {
    try {
      await postAgents(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ========== useEffects useCallbacks ========== //

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!activeDropdownRef.current?.contains(e.target as Node)) {
        setActiveBtn(undefined);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const savedValues = localStorage.getItem("agentValues");
    const savedImg = localStorage.getItem("imgValue");

    if (savedValues) {
      setAgentValues(JSON.parse(savedValues));
    }

    if (savedImg) {
      setImgValue(JSON.parse(savedImg));
    }
  }, []);

  const saveToLocalStorage = useCallback(
    debounce((updatedValues: AgentValuesT) => {
      localStorage.setItem("agentValues", JSON.stringify(updatedValues));
    }, 500),
    []
  );

  // ========== Handlers ========== //

  const handleActiveDropdown = (i: number) => {
    setActiveBtn((prev) => {
      if (prev === i) return undefined;

      return i;
    });
  };

  const handleSelectRegion = (e: string[]) => {
    setSelectedRegions(e);
    localStorage.setItem("selectedRegions", JSON.stringify(e));
    setActiveBtn(undefined);
  };

  const handlePriceConfirm = (
    from: number | undefined,
    to: number | undefined
  ) => {
    setPriceFrom(from);
    setPriceTo(to);
    localStorage.setItem("priceFrom", from?.toString() || "");
    localStorage.setItem("priceTo", to?.toString() || "");
    setActiveBtn(undefined);
  };

  const handleAreaConfirm = (
    from: number | undefined,
    to: number | undefined
  ) => {
    setAreaFrom(from);
    setAreaTo(to);
    localStorage.setItem("areaFrom", from?.toString() || "");
    localStorage.setItem("areaTo", to?.toString() || "");
    setActiveBtn(undefined);
  };

  const handleBedsConfirm = (beds: number | undefined) => {
    setBedsValue(beds);
    localStorage.setItem("bedsValue", beds?.toString() || "");
    setActiveBtn(undefined);
  };

  const handleRemoveRegion = (e: string) => {
    setSelectedRegions((prev) => {
      const filteredData = prev.filter((el) => el !== e);
      localStorage.setItem("selectedRegions", JSON.stringify(filteredData));
      return [...filteredData];
    });
  };

  const handleRemovePricesRange = () => {
    setPriceFrom(undefined);
    setPriceTo(undefined);
    localStorage.removeItem("priceFrom");
    localStorage.removeItem("priceTo");
  };

  const handleRemoveareaRange = () => {
    setAreaFrom(undefined);
    setAreaTo(undefined);
    localStorage.removeItem("areaFrom");
    localStorage.removeItem("areaTo");
  };

  const handleRemoveBeds = () => {
    setBedsValue(undefined);
    localStorage.removeItem("bedsValue");
  };

  const clearAllFilters = () => {
    setSelectedRegions([]);
    handleRemovePricesRange();
    handleRemoveareaRange();
    handleRemoveBeds();
    localStorage.clear();
  };

  if (!estatesData || !regionsData) return <Loading />;

  const filteredData = () => {
    let data = estatesData;
    if (selectedRegions.length > 0) {
      data = data.filter((item) =>
        selectedRegions.includes(item.city.region.name)
      );
    }
    if (priceFrom && !priceTo) {
      data = data.filter((item) => item.price >= priceFrom);
    }
    if (priceFrom && priceTo) {
      data = data.filter(
        (item) => item.price >= priceFrom && item.price <= priceTo
      );
    }

    if (areaFrom && !areaTo) {
      data = data.filter((item) => item.area >= areaFrom);
    }

    if (areaFrom && areaTo) {
      data = data.filter(
        (item) => item.area >= areaFrom && item.area <= areaTo
      );
    }
    if (bedsValue) {
      data = data.filter((item) => item.bedrooms === bedsValue);
    }

    return data;
  };

  const handleIputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgentValues((prev) => {
      const updatedValues = { ...prev, [name]: value };

      saveToLocalStorage(updatedValues);

      return updatedValues;
    });
  };

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

    if (!imgValue) {
      setImageError(true);
      hasError = true;
    } else {
      setImageError(false);
    }

    return hasError;
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgValue(e.target.files[0]);
      setImageError(false);
    }
  };

  const clearAgentsData = () => {
    setImgValue(null);
    setAgentValues({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPhoneError(false);
    setImageError(false);
    setOpen(false);
    localStorage.removeItem("agentValues");
    localStorage.removeItem("imgValue");
  };

  const handleSubmit = async () => {
    const hasError = errorHandler();

    if (hasError || !imgValue) {
      return;
    }

    const data: PostAgentsReq = {
      ...agentValues,
      avatar: imgValue,
    };
    createAgents(data);
    clearAgentsData();
  };

  const handleCancel = () => {
    clearAgentsData();
  };

  const props: HompageComponentProps = {
    regionsData,
    activeBtn,
    selectedRegions,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    bedsValue,
    activeDropdownRef,
    open,
    agentValues,
    imgValue,
    nameError,
    surnameError,
    emailError,
    phoneError,
    imageError,
    setOpen,
    handleIputsChange,
    handleImgChange,
    onOk: handleSubmit,
    onClose: handleCancel,
    filteredData,
    handleActiveDropdown,
    handleSelectRegion,
    handlePriceConfirm,
    handleAreaConfirm,
    handleBedsConfirm,
    handleRemoveRegion,
    handleRemovePricesRange,
    handleRemoveBeds,
    handleRemoveareaRange,
    clearAllFilters,
  };

  return <HomepageComponent {...props} />;
};

export default HomepageContainer;
