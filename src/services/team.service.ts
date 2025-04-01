import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { IEmployee } from '@/interfaces';


class TeamService{
    
    getTeamMembers = async () => {
      const url = "/api/admin/read/users";
      return await callApi(url,API.GET);
    }

    addTeamMember = async (userDetails:IEmployee) => {
      console.log("member",userDetails);
      const payload5 = {
        ...userDetails,
        "permission":"full"
      }
//       const payload4 = {
//   "name": "pavankumar1234",
//   "initial": "pk4123",
//   "email": "pavankumar4124@gmail.com",
//   "password": "test1123442",
//   "department":"Sales", // "Sales", "Marketing"
//   "role": "admin",
//   "permission": "full",
//   "reporting": "",
//   "phone": "1872440842"
// }
      const url = "/api/user/write/create-or-update";
      return await callApi(url,API.POST,payload5,true);
    }
}

export const TeamInstance = new TeamService();