import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import {ApiResponse} from "@/api/ApiResonpse.ts";
import {ApiError} from "@/api/ApiError.ts";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cross-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


axiosClient.interceptors.response.use(
  (response) => {
    const apiResponse : ApiResponse<any> = response.data
    // 200번대 응답이지만 result가 FAIL인 경우
    // 응답 body에서 받은 에러코드와 메시지로 에러 객체 생성 후 throw
    if(apiResponse.result === 'FAIL') {
      throw new ApiError({
        errorCode: apiResponse.errorCode,
        message: apiResponse.message
      })
    }
    return {
      ...response,
      data: apiResponse.data
    }
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = secureLocalStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }
      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Cross-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      if (resp.ok) {
        console.log('토큰 재발급 성공');
        const res = await resp.json();
        console.log(res);
        secureLocalStorage.setItem('accessToken', res.data.data.accessToken);
        // 원래 요청에서 header에 accessToken을 추가하고 다시 요청
        originalRequest.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
        return axiosClient(originalRequest);
      }else{
        console.log('토큰 재발급 실패');
        secureLocalStorage.removeItem('accessToken');
        secureLocalStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
    // 응답 body에서 받은 에러코드와 메시지로 에러 객체 생성 후 throw
    const resBody = error.response.data;
    if(resBody.result === 'FAIL') {
      throw new ApiError({
        errorCode: resBody.errorCode,
        message: resBody.message
      })
    }
    return Promise.reject(error);
  },
);