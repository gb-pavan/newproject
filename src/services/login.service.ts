import { API } from '@/utils/enum';
import { callApi } from './http.service';


class LoginService{
    getLoginResponse = async (credentials:{email:string,password:string}) => {
      const url = `/api/leader/read/get-leader-data`;
      return await callApi(url,API.GET,credentials,true);
    }
}

export const LoginInstance = new LoginService();