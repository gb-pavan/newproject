'use client';
import CustomDropdown2 from "@/components/MyDropdown2";
import { RegionOption } from "@/interfaces/form.interface";
import { FormInstance } from "@/services/form.service";
import { convertToOptions, handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";


const RegionContainer: React.FC = () => {

  const [regions,setRegions] = useState<RegionOption[]>();

   useEffect(() => {
     const regionData = async () => {
    try {
      const regionResponse:RegionOption[] = await FormInstance.getRegions();
      setRegions(regionResponse);      
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  };
    regionData();
  }, []); // Runs when these dependencies change

  const handleChangeRegion = (values:string[]) => {
    console.log("values",values);
  }

  return (
    <div>
      <CustomDropdown2 options={convertToOptions(regions ?? [])} onChange={(values)=>handleChangeRegion(values)} />
    </div>
  );
};

export default RegionContainer;
