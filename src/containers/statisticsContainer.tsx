import React from "react";
import DynamicTable3 from "@/components/DragDropTable";
import { columns } from "@/utils/constants";
import SearchBox from "@/components/SearchBox";
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { ITableFields } from "@/interfaces";



interface StatisticsContainerProps {
  data: ITableFields[];
  title:string;
}

const StatisticsContainer: React.FC<StatisticsContainerProps> = ({ data,title }) => {
  return (
    <div
      className="border border-black border-r p-4 rounded-lg dark:invert w-full overflow-hidden"
      style={{ height: "400px" }} // Increased height to fit content better
    >
      <h1 className="text-2xl mb-4">{title}</h1>
      <div className="flex flex-col h-full">
        {data?.length > 0 ? (
          <>
            {/* Search and pagination container, only shown when data is available */}
            <div className="flex justify-between items-center gap-10 p-2">
              <SearchBox placeholder="Type and Press Enter" iconSize={28} responsive
                  iconColor="#0D2167"
              />
              <div className="flex items-center gap-3">
                <MdKeyboardArrowLeft size={24} color="#0D2167" />
                {1}
                <MdOutlineKeyboardArrowRight size={24} color="#0D2167" />
              </div>
              <IoSettingsOutline size={24} color="#0D2167" />
            </div>
            {/* Table wrapper to prevent overflow */}
            <div className="overflow-auto flex-grow">
              {/* <DynamicTable3 columns={columns} data={data} /> */}
              <DynamicTable3 data={data} columns={columns} tableType="" />
            </div>
          </>
        ) : (
          // Show image when there is no data
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <Image src="/EmptyImg.svg" alt="No data available" priority width={400} height={450} />
            <p>This Folder is Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsContainer;

