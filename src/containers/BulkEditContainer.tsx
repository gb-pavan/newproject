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

// interface BulkActionsProps {
//   selectedCount: number;
//   onEditClick: () => void;
//   onProceed: () => void;
// }

const BulkActions: React.FC = () => {

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
  console.log("assignee options",mapAssigneeToDropdownOptions(assignee,{ showCheckbox: true,addDeco:true }));

  const handleAssignTo = async (assignedTo:string[]) => {
    setAssignedTo(assignedTo);
    // const payloadAssign = {
    //   leadIds : values,
    //   managerId :assignedTo[0]
    // }
    // await TableInstance.assignTo(payloadAssign);
  }

  // const handleDistribute = async () => {
  //   const payloadAssign = {
  //     leadIds : values,
  //     managerId :assignTo
  //   }
  //   await TableInstance.assignTo(payloadAssign);
  // }

  const handleDistribute = async () => {
    const payloadAssign = {
      leadIds: values,
      managerId: assignTo,
    };

    await toast.promise(
      TableInstance.assignTo(payloadAssign),
      {
        loading: "Distributing leads...",
        success: "Leads assigned successfully!",
        error: "Failed to assign leads. Please try again.",
      }
    );
  };


  return (
    <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4 w-[500px]">
      {/* <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700">
          Selected leads:  <button  className="text-blue-500 underline ml-2 text-xs">Edit</button>
        </div>
      </div> */}

      <div className="flex flex-col space-y-2 gap-2">
        {/* Update Status */}
        {/* <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Update Lead/s Status:</span>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
            <BsFilter className="mr-1" /> Stage
          </span>
        </div> */}
        {/* <div className="flex items-center space-x-2 flex-nowrap">
          <span className="text-sm text-gray-600 whitespace-nowrap">Update Lead/s Status:</span>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full inline-flex items-center">
            <BsFilter className="mr-1 text-sm" />
            Stage
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Update Lead/s Rating:</span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <AiFillStar key={i} className="text-gray-300" />
            ))}
          </div>
        </div> */}

        {/* Reassign */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Re/assign leads to</span>
          <FaUser className="text-gray-500" />
          <CustomDropdown2 options={mapAssigneeToDropdownOptions(assignee,{ showCheckbox: true,addDeco:true }).filter((option) => option.label?.toLowerCase() !== "select all")} multiSelect selectedValues={assignTo} defaultValue='AssignTo' onChange={handleAssignTo} />
        </div>

        {/* <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Add Lead to</span>
          <FaPlusCircle className="text-gray-500" />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Remove Lead from</span>
          <FaMinusCircle className="text-gray-500" />
        </div>

        <div className="col-span-full">
          <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
            <option>Select a field</option>
          </select>
        </div> */}
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
