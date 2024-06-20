import {ProjectDetailModel} from "@/api/project/project.response.ts";
import {useUserStore} from "@/store/userStore.ts";


export function AfterAnalysisProjectList({projectDetails}: {projectDetails?: ProjectDetailModel[]}) {
  return (
    <div className="w-[420px] flex flex-col p-[24px]
     bg-white rounded-[24px]">
      <h1 className="text-[20px] font-bold mb-[20px]">분석 완료된 프로젝트</h1>
      <div className="flex flex-col">
        {projectDetails?.map((projectDetail) => (
          <AfterAnalysisProjectItem key={projectDetail.id} projectDetail={projectDetail}/>
        ))}
      </div>
    </div>
  );
}

function AfterAnalysisProjectItem({projectDetail}: {projectDetail: ProjectDetailModel}) {
  const {user} = useUserStore();

  function ChipBox({content}: {content: string}) {
    return (
      <div className="h-[26px] bg-gray-4 mr-2 rounded flex items-center px-[6px]">
        <h4 className="text-[12px] font-medium text-gray-0">
          {content}
        </h4>
      </div>
    );
  }
  //기여도
  const totalContribute = projectDetail.contributors.map((contributor) => contributor.contributions).reduce((acc, cur) => acc + cur, 0);
  const contributePercent = projectDetail.contributors.find((contributor) => contributor.githubUsername === user?.githubUsername)!.contributions / totalContribute * 100;


  return (
    <div className="w-[372px] h-[212px] flex flex-col mb-[40px] ">
      <div className="w-full h-[138px] bg-red-300 rounded-[24px]"></div>
      <h1 className="my-2 text-[16px] font-bold">
        {projectDetail.projectName}
      </h1>
      <div className="flex flex-row">
        {projectDetail.language && (
          <ChipBox content={`${projectDetail.language}`}/>
        )}
        <ChipBox content={`${projectDetail.contributors.length}인`}/>
        <ChipBox content={`기여도 ${contributePercent}%`}/>
        <ChipBox content={`별 ${projectDetail.starsCount}`}/>
      </div>
    </div>
  );
}