import { API } from "@/utils/enum";
import { callApi } from "./http.service";
import { IAddTask } from "@/interfaces/addTask.interface";
import { FormField } from "@/interfaces/form.interface";

class TableService {
  getTableData = async () => {
    const url = "/api/lead/read/leads-without-actions";
    //   return responseObject;
    console.log("await callApi(url,API.POST)2", callApi(url, API.POST));
    return await callApi(url, API.POST);
  };

  toggleFavorite = async (leadId: string, currentState: boolean) => {
    const url = `/api/lead/write/favorite/${leadId}`;
    return await callApi(url, API.PATCH, { favorite: currentState }, true);
  };

  getFullDetails = async (userId: string) => {
    const url = `/api/lead/read/get-lead-by?Id=${userId}`;
    //   return rowDetail;
    return await callApi(url, API.GET);
  };

  createTask = async (taskDetails: IAddTask) => {
    const url = "/api/task/create";
    return await callApi(url, API.POST, taskDetails, true);
  };

  getFormFields = async (): Promise<FormField[]> => {
    const url = "/api/lead_field/read/get-all-fields";
    return await callApi(url, API.GET);
    //   return fields;
  };
}

export const TableInstance = new TableService();
