import { API } from '@/utils/enum';
import { callApi } from './http.service';


class LoginService{
    getLoginResponse = async (credentials:{email:string,password:string}) => {
      const url = `/api/auth/user/login`;
      return await callApi(url,API.POST,credentials,true);
    }
}

export const LoginInstance = new LoginService();