'use client';
import React, { useCallback, useEffect, useState } from "react";
import DynamicTable3 from "@/components/DragDropTable";
import { TeamColumns } from "@/utils/constants";
import TeamFilters from "./teamFilters";
import { TeamInstance } from "@/services/team.service";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { IoSearchOutline } from "react-icons/io5";
import CustomDropdown2 from "@/components/MyDropdown2";
import SlidingPanel from "@/components/SlidePanel";
import StaticForm from "../staticForm";
import { IEmployee, IEmployeeDetails } from "@/interfaces";
import { QueryState } from "@/interfaces/tableFilterTypes";
import Pagination from "@/components/Pagination";

// type AuthData = {
//   token?: string;
//   role?: string;
//   department?: string;
//   isDeleted?: boolean;
// };

type UserMeta = {
  role?: string;
  department?: string;
  isDeleted?: boolean;
  search?:string;
};

const TeamContainer: React.FC = () => {

  const [team,setTeam] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  // const [authData, setAuthData] = useState<AuthData>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalRows, setTotalRows] = useState<number>(0);
  const totalPages = (totalRows/rowsPerPage);
  const [query, setQuery] = useState<QueryState>({
    filters:[],
    logic: "AND",
    pagination: {
      page: currentPage,
      limit: rowsPerPage
    }
  });

  const [userMeta, setUserMeta] = useState<UserMeta>({
    role: undefined,
    department: undefined,
    isDeleted: undefined,
    search:undefined
  });


  function filterIvrActiveUsers(users: IEmployeeDetails[]): IEmployeeDetails[] {
    return users.filter(user => user.ivrActive);
  }

  const fetchTeam = useCallback(async () => {
  console.log("check search", userMeta.search);
  try {
    const teamResponse = await TeamInstance.getTeamMembers({
      search:userMeta.search,
      role: userMeta.role,
      page: currentPage,
      limit: rowsPerPage,
    });
    console.log("team response", teamResponse);

    setTeam(teamResponse.users);
    setTotalRows(teamResponse?.total);
  } catch (error) {
    handleError(error as AxiosError, false);
  }
}, [currentPage, rowsPerPage, userMeta]); // <-- Add userMeta here

useEffect(() => {
  console.log("mikkkk");
  fetchTeam();
}, [fetchTeam, query, userMeta]); // 👌 still needed

  console.log("sssss user metal search",userMeta.search);


   const handleOptionChange = (value: string[]) => {
    console.log("value",value);
    if (value[0] === 'add_user'){
      setIsSliderOpen(true);
    }
  };

  const handleFormSubmit = async (formData: IEmployee) => {
    console.log("formDataaa",formData);
    try {
      const addResponse = await TeamInstance.addTeamMember(formData); // Wait for the API call to complete
      console.log("add res",addResponse);
      fetchTeam(); // Refresh the team list after adding a new member
      setIsSliderOpen(false); // Close the panel after submission
    } catch (error) {
      handleError(error as AxiosError, false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 p-4 pb-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">Team</h1>
            <span className="text-gray-500 text-sm">{team.length} members ({filterIvrActiveUsers(team).length} active)</span>
          </div>
          <div className="flex gap-2">
            <button className="text-blue-600 text-sm flex items-center gap-1">
              <IoSearchOutline className="h-4 w-4" />
              Export
            </button>
            <div className="relative">
              <CustomDropdown2 options={[
                { label: "Add User", value: "add_user", icon: "user-plus" },
                { label: "Add Team from Excel", value: "add_team_excel", icon: "file-spreadsheet" },
              ]} defaultValue="+Add Team" onChange={handleOptionChange} />
              <SlidingPanel isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)}>
                <StaticForm onFormSubmit={handleFormSubmit} />
              </SlidingPanel>
            </div>
          </div>
        </div>
      <TeamFilters setUserMeta={setUserMeta} />
      <DynamicTable3 data={team} columns={TeamColumns} tableType="team"/>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={(page:number) => {
            setQuery(prevQuery => ({
              ...prevQuery,
              pagination: {
                ...prevQuery.pagination,
                page: page
              }
            }));
            setCurrentPage(page);
          }}
          onRowsPerPageChange={(rows:number) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
    </div>
  );
};

export default TeamContainer;