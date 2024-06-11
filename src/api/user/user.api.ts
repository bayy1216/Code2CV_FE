import {UserModel} from "@/api/user/user.response.ts";

export async function getUser() :Promise<UserModel> {
  // const res = await axiosClient.get('/api/user');

  // id: number;
  // githubName: string;
  // githubUserName: string;
  // githubBio: string;
  // githubCompany: string;
  // profileImageUrl: string;
  // githubStartAt: string;
  return {
    id: 1,
    githubName: '손홍석',
    githubUserName: 'bayy1216',
    githubBio: '안녕하세요',
    githubCompany: '경북대',
      profileImageUrl: 'https://github.com/bayy1216.png',
    githubStartAt: 'githubStartAt',
  }
}