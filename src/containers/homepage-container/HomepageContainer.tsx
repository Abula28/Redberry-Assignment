import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";
import { getRealEstates, getRegions } from "@/api/services";
import HomepageComponent from "@/components/homepage-components/HomepageComponent";
import { HompageComponentProps } from "@/types/component-types/homepageComponentProps";
import { useState, useEffect, useRef } from "react";

const HomepageContainer = () => {
  const [estatesData, setEstatesData] = useState<GetRealEstatesRes[]>();
  const [regionsData, setRegionsData] = useState<GetRegionsRes[]>();
  const [activeBtn, setActiveBtn] = useState<number>();
  const activeBtnRef = useRef<HTMLButtonElement>(null);

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

  const getData = async () => {
    const realEstates = await getRealEstates();
    const regions = await getRegions();

    setEstatesData(realEstates);
    setRegionsData(regions);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!activeBtnRef.current?.contains(e.target as Node)) {
        setActiveBtn(undefined);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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

  if (!estatesData || !regionsData) return <p>Loading...</p>;

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

  const props: HompageComponentProps = {
    regionsData,
    activeBtn,
    selectedRegions,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    bedsValue,
    activeBtnRef,
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
