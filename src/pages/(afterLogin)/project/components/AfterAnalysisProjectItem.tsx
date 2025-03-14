import {ProjectAnalysisMetaModel} from "@/api/project/project.response.ts";
import {Link} from "react-router-dom";


export function AfterAnalysisProjectList({projectAnalysisMetas}: {
  projectAnalysisMetas?: ProjectAnalysisMetaModel[]
}) {
  return (
    <div className="w-[420px] min-h-[640px] max-h-[calc(100%-16px)] flex flex-col py-[24px]
     bg-white rounded-[24px]">
      <h1 className="text-[20px] font-bold mb-[20px] px-[24px]">분석 완료된 프로젝트</h1>
      <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto pl-[24px]">
        {projectAnalysisMetas?.map((projectAnalysisMeta) => (
          <AfterAnalysisProjectItem key={projectAnalysisMeta.id} projectAnalysisMeta={projectAnalysisMeta}/>
        ))}
      </div>
    </div>
  );
}

function AfterAnalysisProjectItem({projectAnalysisMeta}: { projectAnalysisMeta: ProjectAnalysisMetaModel }) {

  function ChipBox({content}: { content: string }) {
    return (
      <div className="h-[26px] bg-gray-4 mr-2 rounded flex items-center px-[6px]">
        <h4 className="text-[12px] font-medium text-gray-0">
          {content}
        </h4>
      </div>
    );
  }

  //기여도


  return (
    <div className="w-[372px] h-[212px] flex flex-col mb-[40px]">
      <Link to={`/user/project/${projectAnalysisMeta.id}`}>
        <div className="w-full h-[138px] bg-red-300 rounded-[24px]"></div>
        <h1 className="my-2 text-[16px] font-bold">
          {projectAnalysisMeta.projectName}
        </h1>
        <div className="flex flex-row">
          {projectAnalysisMeta.language && (
            <ChipBox content={`${projectAnalysisMeta.language}`}/>
          )}
          <ChipBox content={`${projectAnalysisMeta.contributorCount}인`}/>
          {/*<ChipBox content={`기여도 ${contributePercent}%`}/>*/}
          <ChipBox content={`별 ${projectAnalysisMeta.starsCount}`}/>
        </div>
      </Link>
    </div>
  );
}