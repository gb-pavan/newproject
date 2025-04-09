import { API } from "@/utils/enum";
import { callApi } from "./http.service";
import { IAddTask } from "@/interfaces/addTask.interface";
import { FormField } from "@/interfaces/form.interface";

class TableService {
  getTableData = async () => {
    const url = "/api/lead/read/leads-without-actions";
    return await callApi(url, API.POST);
  };

  toggleFavorite = async (leadId: string, currentState: boolean) => {
    const url = `/api/lead/write/favorite/${leadId}`;
    return await callApi(url, API.PATCH, { favorite: currentState }, true);
  };

  getFullDetails = async (userId: string) => {
    const url = `/api/lead/read/get-lead-by?Id=${userId}`;
    return await callApi(url, API.GET);
  };

  createTask = async (taskDetails: IAddTask) => {
    const url = "/api/task/create";
    return await callApi(url, API.POST, taskDetails, true);
  };

  getFormFields = async (): Promise<FormField[]> => {
    const url = "/api/lead_field/read/get-all-fields?active=true&isForm=true";
    return await callApi(url, API.GET);
  };

  getColumns = async () => {
    const url = "/api/lead/read/columns";
    return await callApi(url, API.GET);
  };

  assignTo = async (payload:{leadIds:string[],managerId:string}) => {
    const payload2 = {
      "leadIds":payload.leadIds,
      "managerId":payload.managerId
    }
//     const payload2 = {
//   "leadIds": ["67f0da5edf5db3a5769661b3","67f0da3bdf5db3a576966189","67f0c8b6243da460622e2ca3","67f0c66d243da460622e2c84"],
//   "managerId": "67daa956062b34038e35df4c"
// }
    const url = "/api/admin/write/assign-multiple-leads-to-manager";
    return await callApi(url, API.PUT,payload2,true);
  };
}

export const TableInstance = new TableService();
