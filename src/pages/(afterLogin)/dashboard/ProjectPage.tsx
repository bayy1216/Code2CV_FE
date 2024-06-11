import {useQuery} from "@tanstack/react-query";
import {ProjectModel} from "@/api/project/project.response.ts";
import {getProjects} from "@/api/project/project.api.ts";

export default function ProjectPage() {
  const {data} = useQuery<ProjectModel[]>({
      queryKey: ['project'],
      queryFn: getProjects,
  });

  console.log(data);

  return (
    <div className="w-full h-full flex flex-row justify-center pt-4">
      <ProjectList projects={data}/>
      <div className="w-4"></div>
      <AfterAnalysisProjectList/>
    </div>
  );
}

function ProjectList({projects}: {projects?: ProjectModel[]}) {

  if (!projects) {
    return (
      <div className="w-[640px] flex flex-col
      items-center bg-white pt-12 rounded-[24px]">
        <h1 className="text-[20px] font-bold">프로젝트가 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="w-[640px] flex flex-col
    items-center bg-white pt-12 rounded-[24px]">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project}/>
      ))}
    </div>
  );
}

function ProjectItem({project}: {project: ProjectModel}) {
  return (
    <div className="w-[640px] flex flex-row justify-between
    items-center bg-white p-12 rounded-[24px]">
      <h1 className="text-[20px] font-bold">{project.projectName}</h1>
      {project.updatedAt}
    </div>
  );

}

function AfterAnalysisProjectList(){
  return (
    <div className="w-[420px] flex flex-col p-[24px]
     bg-white rounded-[24px]">
      <h1 className="text-[20px] font-bold">분석 완료된 프로젝트</h1>
      <div className="flex flex-col">

      </div>
    </div>
  );

}