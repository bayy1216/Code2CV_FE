import {ProjectModel} from "@/api/project/project.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getProjects() : Promise<ProjectModel[]>{
  const res = await axiosClient.get('/p/api/projects');
  return res.data;
}

export async function refreshProjects() : Promise<void>{
  const res = await axiosClient.post('/p/api/projects');
  return res.data;
}


