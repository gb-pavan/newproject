'use client';
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { DynamicTable } from "@/components/DynamicTable";
import { getEmployeeColumns } from "@/utils/enum/teamColumns.enum";
import { ColumnDef } from "@tanstack/react-table";

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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalRows, setTotalRows] = useState<number>(0);
  const selectedRowIdsRef = useRef<Set<string>>(new Set());
  const totalPages = (totalRows/rowsPerPage);
  const [staticColumns, setStaticColumns] = useState<ColumnDef<IEmployee>[]>();
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

//   const fetchTeam = useCallback(async () => {
//   try {
//     const teamResponse = await TeamInstance.getTeamMembers({
//       search:userMeta.search,
//       department:userMeta.department,
//       role: userMeta.role,
//       page: currentPage,
//       limit: rowsPerPage,
//     });

//     setTeam(teamResponse.users);
//     setTotalRows(teamResponse?.total);
//   } catch (error) {
//     handleError(error as AxiosError, false);
//   }
// }, [currentPage, rowsPerPage, userMeta]); // <-- Add userMeta here

const fetchTeam = useCallback(async () => {
  try {
    const params: Record<string, unknown> = {
      search: userMeta.search,
      page: currentPage,
      limit: rowsPerPage,
    };

    if (userMeta.department !== "All") {
      params.department = userMeta.department;
    }

    if (userMeta.role !== "All") {
      params.role = userMeta.role;
    }

    const teamResponse = await TeamInstance.getTeamMembers(params);

    setTeam(teamResponse.users);
    setTotalRows(teamResponse?.total);
  } catch (error) {
    handleError(error as AxiosError, false);
  }
}, [currentPage, rowsPerPage, userMeta]);

useEffect(() => {
  if (team?.length > 0) {
    const statColumns = getEmployeeColumns();
    setStaticColumns(statColumns);           
  }
}, [team]);


useEffect(() => {
  fetchTeam();
}, [fetchTeam, query, userMeta]); // 👌 still needed



   const handleOptionChange = (value: string[]) => {
    if (value[0] === 'add_user'){
      setIsSliderOpen(true);
    }
  };

  const handleFormSubmit = async (formData: IEmployee) => {
    try {
      await TeamInstance.addTeamMember(formData); // Wait for the API call to complete
      fetchTeam(); // Refresh the team list after adding a new member
      setIsSliderOpen(false); // Close the panel after submission
    } catch (error) {
      handleError(error as AxiosError, false);
    }
  };

  const handleRowClick = (id: string) => {
    if (selectedRowIdsRef.current.has(id)) {
      selectedRowIdsRef.current.delete(id);
    } else {
      selectedRowIdsRef.current.add(id);
    }
    setSelectedIds(Array.from(selectedRowIdsRef.current)); // causes re-render, but ref is safe

  };

  const handleSelectionChange = (selectedRows: IEmployee[]) => {
    // const currentIds = new Set(
    //   selectedRows
    //     .map((row) => typeof row._id === "string" ? row._id : null)
    //     .filter((id): id is string => id !== null)
    // );

    // const previousIds = selectedRowIdsRef.current;
    // const changedIds = new Set<string>();

    // currentIds.forEach(id => {
    //   if (!previousIds.has(id)) changedIds.add(id); // Newly selected
    // });

    // previousIds.forEach(id => {
    //   if (!currentIds.has(id)) changedIds.add(id); // Deselected
    // });

    // changedIds.forEach(id => handleRowClick(id));
    console.log("just created");
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
      {/* <DynamicTable3 data={team} columns={TeamColumns} tableType="team" setQuery={setQuery}/> */}
      <DynamicTable<IEmployee> 
        data={team} 
        onSelectionChange={handleSelectionChange} 
        columns={[...(staticColumns ?? [])]} 
        // stickyColumns={["select","name","phone"]} 
      />
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