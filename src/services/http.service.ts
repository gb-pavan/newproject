import { API } from '@/utils/enum';
import { handleError } from '@/utils/helpers';
import Axios, { AxiosError } from 'axios';

export const callApi = async (url: string, method: API, data?: object | null, shouldThrowError?: boolean) => {

  // const { token } = getToken();


  // Axios.defaults.headers.common.Authorization = token;
  const hasTempToken = data && "tempToken" in data;

  // Only set default Authorization header if no tempToken is in the data
  if (!hasTempToken) {
    // Axios.defaults.headers.common.Authorization = token;
        Axios.defaults.headers.common.Authorization ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2NhZTQ5NmExODA0ZjljMzZlOGYyODQiLCJyb2xlIjoicm9vdCIsImVtYWlsIjoicmVldGVzaEBnbWFpbC5jb20iLCJwaG9uZSI6IjE4NzI0NDA4OTAiLCJuYW1lIjoiUmVldGVzaCBQYW5kZXkiLCJkZXBhcnRtZW50IjoiU2FsZXMiLCJpYXQiOjE3NDEzNTAwNzR9._77xRfwUX83RcOvYsswHGopnLtK5ZEd8P65wbXu4MJU';

  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const uri = `${baseUrl?.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
 
  const DEFAULT_HEADER = {
    headers: {
      'Content-Type': 'application/json',
      // "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M2ZDJlM2NhMzlhOWM5YzNjM2Y4MjQiLCJyb2xlIjoicm9vdCIsInBlcm1pc3Npb24iOiI2N2M2OTA5MzFkZGM3YWIyNThkMTU3NzIiLCJlbWFpbCI6InJlZXRlYXNocGFuZGV5QGdtYWlsLmNvbSIsInBob25lIjoiMTg3MjQ0MDg5MCIsIm5hbWUiOiJSZWV0ZXNoIFBhbmRleSIsImRlcGFydG1lbnQiOiJTYWxlcyIsImlhdCI6MTc0MjQ0NzM4NH0.U7sa8FQZWE_bSXen6WyD6ZJsyJ7qMjd5Fw35v0ptOE8",
    },
  };
  try {
    const response =
    method === API.POST
    ? await Axios.post(uri, data, DEFAULT_HEADER)
    : method === API.PATCH
    ? await Axios.patch(uri, data, DEFAULT_HEADER)
    : method === API.DELETE
    ? await Axios.delete(uri, DEFAULT_HEADER)
    : method === API.PUT
    ? await Axios.put(uri,data,DEFAULT_HEADER)
    : await Axios.get(uri, DEFAULT_HEADER);

return response.data;

  } catch (error) {
    return handleError(error as AxiosError, shouldThrowError);
  }
};

// import { API } from "@/utils/enum";
// import { handleError } from "@/utils/helpers";
// import Axios, { AxiosError } from "axios";

// export const callApi = async (
//   url: string,
//   method: API,
//   data?: object | null,
//   shouldThrowError?: boolean
// ) => {
//   let uri: string;

//   if (typeof window !== "undefined") {
//     // ✅ Works only on client-side
//     uri = new URL(`/${url}`, process.env.NEXT_PUBLIC_BASE_URL).toString();
//   } else {
//     // ✅ Works on server-side
//     uri = `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`;
//   }

//   console.log("uri", uri);

//   const DEFAULT_HEADER = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M2ZDJlM2NhMzlhOWM5YzNjM2Y4MjQiLCJyb2xlIjoicm9vdCIsInBlcm1pc3Npb24iOiI2N2M2OTA5MzFkZGM3YWIyNThkMTU3NzIiLCJlbWFpbCI6InJlZXRlYXNocGFuZGV5QGdtYWlsLmNvbSIsInBob25lIjoiMTg3MjQ0MDg5MCIsIm5hbWUiOiJSZWV0ZXNoIFBhbmRleSIsImRlcGFydG1lbnQiOiJTYWxlcyIsImlhdCI6MTc0MjQ0NzM4NH0.U7sa8FQZWE_bSXen6WyD6ZJsyJ7qMjd5Fw35v0ptOE8",
//     },
//   };

//   try {
//     const response =
//       method === API.POST
//         ? await Axios.post(uri, data, DEFAULT_HEADER)
//         : method === API.PATCH
//         ? await Axios.patch(uri, data, DEFAULT_HEADER)
//         : await Axios.get(uri, DEFAULT_HEADER);

//     return response.data;
//   } catch (error) {
//     return handleError(error as AxiosError, shouldThrowError);
//   }
// };

