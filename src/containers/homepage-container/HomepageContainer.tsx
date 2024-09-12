import { GetRealEstatesRes, GetRegionsRes } from "@/api/responses";
import { getRealEstates, getRegions } from "@/api/services";
import HomepageComponent from "@/components/homepage-components/HomepageComponent";
import { HompageComponentProps } from "@/types/component-types/homepageComponentProps";
import { useState, useEffect } from "react";

const HomepageContainer = () => {
  const [estatesData, setEstatesData] = useState<GetRealEstatesRes[]>();
  const [regionsData, setRegionsData] = useState<GetRegionsRes[]>();
  const [activeBtn, setActiveBtn] = useState<number>();
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const getData = async () => {
    const realEstates = await getRealEstates();
    const regions = await getRegions();

    setEstatesData(realEstates);
    setRegionsData(regions);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleActiveDropdown = (i: number) => {
    setActiveBtn((prev) => {
      if (prev === i) return undefined;

      return i;
    });
  };

  const handleSelectRegion = (e: string) => {
    setSelectedRegions((prev) => {
      if (prev.includes(e)) return prev.filter((el) => el !== e);

      return [...prev, e];
    });
  };

  const handleRemoveRegion = (e: string) => {
    setSelectedRegions((prev) => {
      const filteredData = prev.filter((el) => el !== e);

      return [...filteredData];
    });
  };

  const clearAllFilters = () => {
    setSelectedRegions([]);
  };

  if (!estatesData || !regionsData) return <p>Loading...</p>;

  const props: HompageComponentProps = {
    estatesData,
    regionsData,
    activeBtn,
    selectedRegions,
    handleActiveDropdown,
    handleSelectRegion,
    handleRemoveRegion,
    clearAllFilters,
  };

  return <HomepageComponent {...props} />;
};

export default HomepageContainer;
