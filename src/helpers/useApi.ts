/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";


const useApi = async (
  searchText = "",
  searchType = "",
  method: MethodType = "GET",
  params?: object
) => {
  const baseUrl = process.env.VUE_APP_API_BASE_URL;
  const key = process.env.VUE_APP_API_KEY || "k_4t4kiik5";
  const url =
    searchType === ""
      ? searchText === ""
        ? `${baseUrl}${key}`
        : `${baseUrl}${searchType}/${key}/${searchText}`
      : searchText === ""
      ? `${baseUrl}${searchType}/${key}`
      : `${baseUrl}${searchType}/${key}/${searchText}`;

  let data: any = {};
  let error: unknown = null;
  let loading = false;
  let errorMsg = "";

  const fetchData = async () => {
    loading = true;
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        params,
      };
      const responseData = await axios(config);
      data = responseData.data;
      errorMsg = responseData.data.errorMessage;
    } catch (err: any) {
      error = err;
    } finally {
      loading = false;
    }
  };

  await fetchData();

  return {
    data,
    errorMsg,
    error,
    loading,
  };
};

export default useApi;
