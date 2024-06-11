import {ProjectModel} from "@/api/project/project.response.ts";

export async function getProjects() : Promise<ProjectModel[]>{
  // const res = await axiosClient.get('/api/projects');
  return [
    {
      id: 1,
      projectUrl: 'https://github.com/bayy1216/knu-heleper',
      projectName: 'KNU Helper',
      starsCount: 100,
      forksCount: 20,
      startAt: '2021-01-01T00:00:00',
      updatedAt: '2021-01-01T00:00:00'
    }
  ];
}