import {ProjectModel} from "@/api/project/project.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getProjects() : Promise<ProjectModel[]>{
  const res = await axiosClient.get('/api/projects');
  return res.data;
}