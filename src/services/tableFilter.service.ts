import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { QueryState } from '@/interfaces/tableFilterTypes';

class FilterService{
    getFilterResponse = async (payload: QueryState) => {
      // const payload2 = {
      //   ...payload,
      //   "page" : payload.pagination.page,
      //   "limit" : payload.pagination.limit
        
      // }
      const { pagination, ...restPayload } = payload;
      const payload2 = {
        ...restPayload,
        page: pagination.page,
        limit: pagination.limit
      };    
      const url = '/api/lead/read/leads-without-actions';
      return await callApi(url,API.POST,payload2);
    }

    getColumnData = async () => {
      const url = '/api/lead_field/read/get-all-fields';
      return await callApi(url,API.GET);
    }
}

export const FilterInstance = new FilterService();