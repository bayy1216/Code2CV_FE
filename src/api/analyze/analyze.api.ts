import {axiosClient} from "@/api/AxiosClient.ts";

export async function analyzeProjects() : Promise<void>{
  const res = await axiosClient.post('/api/analyze');
  return res.data;
}

export async function analyzeProjectById(projectId: number) : Promise<void>{
  const res = await axiosClient.post(`/api/analyze/${projectId}`);
  return res.data;
}