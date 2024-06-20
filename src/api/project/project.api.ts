import {ProjectAnalysisDetailModel, ProjectDetailModel, ProjectModel} from "@/api/project/project.response.ts";
import {axiosClient} from "@/api/AxiosClient.ts";

export async function getProjects() : Promise<ProjectModel[]>{
  const res = await axiosClient.get('/api/projects');
  return res.data;
}


export async function getProjectDetails() : Promise<ProjectDetailModel[]>{
  const res = await axiosClient.get('/api/projects/analysis');
  return res.data;
}

export async function getProjectAnalysisDetailById(projectId: number) : Promise<ProjectAnalysisDetailModel>{
  const res = await axiosClient.get(`/api/projects/analysis/${projectId}`);
  return res.data;
}