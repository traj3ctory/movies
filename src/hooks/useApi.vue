<template>
  <div></div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios, { AxiosRequestConfig } from "axios";

type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default function useApi(
  searchText = "",
  searchType = "",
  method: MethodType = "GET",
  params?: object
) {
  const baseUrl = process.env.VUE_APP_API_BASE_URL;
  const key = process.env.VUE_APP_API_KEY;
  const url =
    searchType === ""
      ? searchText === ""
        ? `${baseUrl}${key}`
        : `${baseUrl}${searchType}/${key}/${searchText}`
      : searchText === ""
      ? `${baseUrl}${searchType}/${key}`
      : `${baseUrl}${searchType}/${key}/${searchText}`;

  const data = ref<any>(null);
  const error = ref<null | Error>(null);
  const loading = ref<boolean>(false);
  const errorMsg = ref<string>("");

  const fetchData = async () => {
    loading.value = true;
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        params,
      };
      const { data: responseData } = await axios(config);
      data.value = responseData;
      errorMsg.value = responseData.errorMessage;
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  fetchData(); // Fetch data when hook is first called

  return {
    data,
    errorMsg,
    error,
    loading,
  };
}
</script>
