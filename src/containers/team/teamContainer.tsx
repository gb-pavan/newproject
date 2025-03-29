'use client';
import React, { useEffect, useState } from "react";
import DynamicTable3 from "@/components/DragDropTable";
import { TeamColumns } from "@/utils/constants";
import TeamFilters from "./teamFilters";
import { TeamInstance } from "@/services/team.service";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";

const TeamContainer: React.FC = () => {

  const [team,setTeam] = useState([]);

  const fetchTeam = async () => {
    try {
      const teamResponse = await TeamInstance.getTeamMembers(); // Await the response
      setTeam(teamResponse.users);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  };

  useEffect(() => {   
    fetchTeam();
  }, []);

  return (
    <div>
      <TeamFilters />
      <DynamicTable3 data={team} columns={TeamColumns} />
    </div>
  );
};

export default TeamContainer;