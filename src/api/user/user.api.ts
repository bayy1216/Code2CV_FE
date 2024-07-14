import {SkillDashboardResponse, UserModel} from "@/api/user/user.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getUser() :Promise<UserModel> {
  const res = await axiosClient.get('/p/api/user');
  return res.data;
}

export async function getSkillDashboard() :Promise<SkillDashboardResponse> {
  const res = await axiosClient.get('/p/api/user/dashboard');
  return res.data;
}