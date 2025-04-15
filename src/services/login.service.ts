import { API } from '@/utils/enum';
import { callApi } from './http.service';


class LoginService{
    getLoginResponse = async (credentials:{email:string,password:string}) => {
      const url = `/api/auth/user/login`;
      return await callApi(url,API.POST,credentials,true);
    }

    verifyOtpResponse = async (credentials:{email:string,otp:string,tempToken:string}) => {
      const url = `/api/auth/user/verify-otp`;
      return await callApi(url,API.POST,credentials,true);
    }

    forgotPasswordRequest = async (credentials:{email:string}) => {
      const url = `/api/password/auth/forgot-password`;
      return await callApi(url,API.POST,credentials,true);
    }

    verifyForgotPasswordResponse = async (credentials:{email:string,otp:string,tempToken:string}) => {
      console.log("verrify resett otp",credentials);
      const payload = {
        "email": credentials.email,
        "otp":credentials.otp,
        "tempToken": credentials.tempToken
      }
      const url = `api/password/auth/verify-reset-otp`;
      return await callApi(url,API.POST,payload,true);
    }

    resetPasswordResponse = async (credentials:{newPassword:string,resetToken:string}) => {
      const payload = {
        "newPassword":credentials.newPassword,
        "resetToken":credentials.resetToken
      }
      console.log("new password send",payload);
      const url = `/api/password/auth/reset-password`;
      return await callApi(url,API.POST,payload,true);
    }

    resendOtp = async (credentials:{email:string,tempToken:string}) => {
      const url = `/api/auth/user/resend-otp`;
      return await callApi(url,API.POST,credentials,true);
    }
}

export const LoginInstance = new LoginService();