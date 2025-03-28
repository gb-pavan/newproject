'use client';
import React from "react";
import StatisticsContainer from "@/containers/statisticsContainer";
import { ITableFields } from "@/interfaces";

const emptyData:ITableFields[] = [];


const Home: React.FC = () => {

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <StatisticsContainer data={emptyData} title={'My open Task'} />
      <StatisticsContainer data={emptyData} title={'My Meeting'} />
      <StatisticsContainer data={emptyData} title={'Today Leads'} />
      <StatisticsContainer data={emptyData} title={'My Deals Closing This Month'} />
    </div>
  );
};

export default Home;
