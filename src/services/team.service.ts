import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { IEmployee } from '@/interfaces';

type Department = "Sales" | "Marketing" | "Support";

class TeamService{
    
    // getTeamMembers = async () => {
    //   const url = `api/admin/read/users?role=admin&department=Sales&isDeleted=false&page=1&limit=10`;
    //   return await callApi(url,API.GET);
    // }

    // Accept optional filters as params
    getTeamMembers = async ({
      role,
      search,
      department,
      isDeleted,
      page = 1,
      limit = 10,
    }: {
      role?: string;
      department?: string;
      isDeleted?: boolean;
      page?: number;
      limit?: number;
      search?:string;
    }) => {
      const params = new URLSearchParams();
      console.log("rolleeeee",search);

      // Always include page and limit
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      // Conditionally add optional params
      if (role) params.append('role', role);
      if (search) params.append('search',search);
      if (department) params.append('department', department);
      if (typeof isDeleted === 'boolean') {
        params.append('isDeleted', isDeleted.toString());
      }

      const url = `/api/admin/read/users?${params.toString()}`;
      console.log("url",url);
      return await callApi(url, API.GET);
    };


    getReporteesByDepartment = async (department: Department) => {
      const url = `/api/admin/read/reportees?department=${department}`;
      return await callApi(url,API.GET);
    }

    getReportingByDepartment = async (department: Department) => {
      const url = `/api/admin/read/reporting-to?department=${department}`;
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