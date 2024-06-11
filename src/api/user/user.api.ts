import {UserModel} from "@/api/user/user.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getUser() :Promise<UserModel> {
  const res = await axiosClient.get('/api/user');
  return res.data;
}