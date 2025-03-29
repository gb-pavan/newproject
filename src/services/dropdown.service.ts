import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { IAssignee, IStatus} from '@/interfaces/tableFilterTypes';

class DropdownService{
    // getAssignee = async (): Promise<IAssignee[]> => {
    //   const url = '/api/admin/read/team-users';
    // //   return assignee1;
    //   return await callApi(url,API.GET);
    // }

    getAssignee = async () => {
      const url = '/api/admin/read/team-users';
    //   return assignee1;
      return await callApi(url,API.GET);
    }

    getStatus = async ():Promise<IStatus[]> => {
      const url = '/api/lead_stage/read/stages';
      return await callApi(url,API.GET)
    //   return statusInfo;
    }
}

export const DropdownInstance = new DropdownService();