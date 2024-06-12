import {useQuery} from "@tanstack/react-query";
import {ProjectModel} from "@/api/project/project.response.ts";
import {getProjects} from "@/api/project/project.api.ts";
import {useState} from "react";
import {analyzeProjectById} from "@/api/analyze/analyze.api.ts";

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

  const [search, setSearch] = useState<string>("");

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
    items-center bg-white pt-12 rounded-[24px] px-4">
      <input
        className="w-full h-[48px] bg-gray-100 rounded-[12px] text-[16px] p-4"
        placeholder="분석할 레포지토리를 검색해보세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="h-[760px] overflow-y-auto w-full">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project}/>
        ))}
      </div>
    </div>
  );
}

function ProjectItem({project}: {project: ProjectModel}) {
  const updatedAt = new Date(project.updatedAt).toLocaleDateString();
  const now = new Date().toLocaleDateString();
  const daysDiff = Math.floor((new Date(now).getTime() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24));

  const onButtonClick = async () => {
    await analyzeProjectById(project.id);
  }

  return (
    <div className="w-full flex flex-row justify-between
    items-center bg-white py-5 border-b px-4">
      <h1 className="text-[16px] font-semibold flex-[3]">
        {project.projectName}
      </h1>
      <div className="text-[14px] font-normal text-gray-1 flex-[4]">
        Updated{daysDiff} days ago
      </div>
      <div className="">
        <button
          className="w-[72px] h-[33px] bg-bc text-white text-[14px] font-medium rounded-[8px]"
          onClick={onButtonClick}
        >
          분석하기
        </button>
      </div>
    </div>
  );

}

function AfterAnalysisProjectList() {
  return (
    <div className="w-[420px] flex flex-col p-[24px]
     bg-white rounded-[24px]">
      <h1 className="text-[20px] font-bold">분석 완료된 프로젝트</h1>
      <div className="flex flex-col">

      </div>
    </div>
  );

}