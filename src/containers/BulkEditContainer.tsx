import React, { useEffect, useState } from 'react';
import { FaUser} from 'react-icons/fa';
import CustomDropdown2 from '@/components/MyDropdown2';
import { handleError, mapAssigneeToDropdownOptions } from '@/utils/helpers';
import { AxiosError } from 'axios';
import { DropdownInstance } from '@/services/dropdown.service';
import { IAssignee } from '@/interfaces/tableFilterTypes';
import { useStringArray } from '@/providers/StringArrayContext';
import { TableInstance } from '@/services/table.service';
import { toast } from "react-hot-toast";

interface BulkActionsProps {
    onClose: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({onClose}) => {

  const { values } = useStringArray();

  const [assignee, setGetAssignee] = useState<IAssignee[]>([]);
  const [assignTo, setAssignedTo] = useState<string[]>([]);

  useEffect(() => {
     const fetchAssignees = async () => {
    try {
      const response = await DropdownInstance.getAssignee(); // Await the API response
      setGetAssignee(response?.users);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  };

  
    fetchAssignees();
  }, []); 

  const handleAssignTo = async (assignedTo:string[]) => {
    setAssignedTo(assignedTo);
    
  }

  const handleDistribute = async () => {
    const payloadAssign = {
      leadIds: values,
      managerId: assignTo[0],
    };

    await toast.promise(
      TableInstance.assignTo(payloadAssign),
      {
        loading: "Distributing leads...",
        success: "Leads assigned successfully!",
        error: "Failed to assign leads. Please try again.",
      }
    );
    onClose();
    
  };

   const getLabelFromAssignee = (assignTo: string[], assignee: IAssignee[]): string | undefined => {
    const label = assignee.find(each => each._id === assignTo[0])?.name;
    return label === "Select All" ? "" : label;
  };




  return (
    <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4 w-[500px]">
      {/* <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700">
          Selected leads:  <button  className="text-blue-500 underline ml-2 text-xs">Edit</button>
        </div>
      </div> */}

      <div className="flex flex-col space-y-2 gap-2">
        

        {/* Reassign */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Re/assign leads to</span>
          <FaUser className="text-gray-500" />
          <CustomDropdown2 options={mapAssigneeToDropdownOptions(assignee,{ showCheckbox: false,addDeco:true }).filter((option) => option.label?.toLowerCase() !== "select all")} 
            defaultValue='AssignTo' 
            onChange={handleAssignTo}
            selectedValues={getLabelFromAssignee(assignTo,assignee)}
          />
        </div>

     
      </div>

      <div className="text-center mt-3">
        <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-6 py-2" onClick={handleDistribute}>
          ✓ PROCEED WITH LEAD
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
