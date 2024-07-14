import {axiosClient} from "@/api/AxiosClient.ts";
import {
  ProjectAnalysisDetailModel,
  ProjectAnalysisMetaModel,
} from "@/api/project/project.response.ts";



export async function analyzeProjectById(projectId: number) : Promise<void>{
  const res = await axiosClient.post(`/p/api/projects/${projectId}/analysis`);
  return res.data;
}

export async function getProjectAnalyzeDetails() : Promise<ProjectAnalysisMetaModel[]>{
  const res = await axiosClient.get('/p/api/projects/analysis');
  return res.data;
}

export async function getProjectAnalysisDetailById(projectId: number) : Promise<ProjectAnalysisDetailModel>{
  const res = await axiosClient.get(`/p/api/projects/${projectId}/analysis`);
  return res.data;
}