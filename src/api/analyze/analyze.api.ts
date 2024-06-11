import {axiosClient} from "@/api/AxiosClient.ts";

export async function analyzeProjects() : Promise<void>{
  const res = await axiosClient.post('/api/analyze');
  return res.data;
}