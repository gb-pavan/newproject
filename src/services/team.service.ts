import { API } from '@/utils/enum';
import { callApi } from './http.service';


class TeamService{
    
    getTeamMembers = async () => {
      const url = `/api/admin/read/users`;
      return await callApi(url,API.GET);
    }
}

export const TeamInstance = new TeamService();