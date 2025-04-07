import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { FormSubmitPayload } from '@/interfaces/form.interface';


class FormService{

  getRegions = async () => {
    const url='/api/region/read/regions';
    return await callApi(url,API.GET);
  }

  submitForm = async (payload:FormSubmitPayload) => {
    const url = `/api/lead/write/create-or-update`;
    return await callApi(url,API.POST,payload,true);
  }
}

export const FormInstance = new FormService();