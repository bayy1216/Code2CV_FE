import { OAuthLoginRequest} from "@/api/auth/auth.request.ts";

import {LoginResponse} from "@/api/auth/auth.response.ts";



export async function oauthLogin(req: OAuthLoginRequest): Promise<LoginResponse> {
  // const res = await axiosClient.post('/api/auth/login/oauth2', req);
  // return res.data;
  console.log(req);
  return {
    accessToken: 'accessToken',
    refreshToken: 'refresh',
    user: {
      id: 1,
      githubName: '손홍석',
      githubUserName: 'bayy1216',
      githubBio: '안녕하세요',
      githubCompany: '경북대',
      profileImageUrl: 'https://github.com/bayy1216.png',
      githubStartAt: 'githubStartAt',
    }
  };
}

export async function logout() {
  // await axiosClient.post('/api/auth/logout');
}