import { OAuthLoginRequest} from "@/api/auth/auth.request.ts";

import {LoginResponse} from "@/api/auth/auth.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";



export async function oauthLogin(req: OAuthLoginRequest): Promise<LoginResponse> {
  const res = await axiosClient.post('/p/api/auth/login/oauth2', req);
  return res.data;
}

export async function logout() {
  // await axiosClient.post('/api/auth/logout');
}