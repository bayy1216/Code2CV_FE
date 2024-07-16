import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ProjectAnalysisDetailModel} from "@/api/project/project.response.ts";
import {getProjectAnalysisDetailById} from "@/api/project/analyze.api.ts";
import {ApiError} from "@/api/ApiError.ts";
import {RootHeaderHeight} from "@/pages/RootHeader.tsx";

export default function ProjectDetailPage() {
  const location = useLocation();
  // http://localhost:5173/user/project/1 에서 1 추출
  const projectId = Number(location.pathname.split("/")[3]);

  const {data} = useQuery<
    ProjectAnalysisDetailModel,
    ApiError,
    ProjectAnalysisDetailModel,
    [_0: string, _1: number]
  >({
    queryKey: ['projectAnalysisDetail', projectId],
    queryFn: context => {
      return getProjectAnalysisDetailById(context.queryKey[1]);
    },

  });

  return (
    <div className={`flex flex-col items-center w-full min-h-[calc(100vh-${RootHeaderHeight})]`}>
      <div className="w-[1080px]">

        <h1 className="font-bold text-[24px] w-full items-start mb-[24px] mt-[12px]">
          분석 결과
        </h1>
        <div className="flex flex-row h-[604px] justify-between">

          <div className="w-[640px] h-full flex flex-col">
            <div className="flex flex-row justify-between">
              <WhiteBox title={"기여도"}>
                {data?.contributions.map((contributor) => (
                  <div>
                    {contributor.githubUserName} - <br/>{contributor.usingLanguages.join(", ")}
                    <br/>
                    commit {contributor.commitCount}<br/>
                    add {contributor.addedLines}, delete {contributor.deletedLines}
                  </div>
                ))}
              </WhiteBox>
              <WhiteBox title={"사용언어"}>
                <div className={"overflow-clip"}>
                  {data?.usingLanguages.map((usingLanguage) => (
                    <div>
                      {usingLanguage.language} : {usingLanguage.bytesOfCode}
                    </div>
                  ))}
                </div>

              </WhiteBox>
            </div>
            <div className="h-[10px]"/>
            <div className="flex flex-row justify-between">
              <WhiteBox title={"기술스택"}>
                {data?.projectAnalysis.usingFrameworks.join(", ")}
              </WhiteBox>
              <WhiteBox title={"커밋분석"}>

              </WhiteBox>
            </div>
            <div className="h-[10px]"/>
            <WhiteBox2 title={"구현한 기능"}>

            </WhiteBox2>

          </div>
          <div className="w-[24px]"/>
          <WhiteBox3 title={"개선 내용 추천"}>

          </WhiteBox3>
        </div>

        <div className="h-[10px]"/>
        <div className={`w-[1080px] h-[200px] bg-white rounded-[20px] p-[24px]`}>
          <h3 className="font-bold text-[20px]">
            메모
          </h3>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WhiteBoxProps {
  children?: React.ReactNode;
  title: string;
}

function WhiteBox({
                    children,
                    title,
                  }: WhiteBoxProps) {
  return (
    <div className={`w-[315px] h-[200px] bg-white rounded-[20px] p-[24px]`}>
      <h3 className="font-bold text-[20px]">
        {title}
      </h3>
      <div>
      {children}
      </div>
    </div>
  );
}

function WhiteBox2({
  children,
  title,
}: WhiteBoxProps) {
  return (
    <div className={`w-full h-[200px] bg-white rounded-[20px] p-[24px]`}>
      <h3 className="font-bold text-[20px]">
        {title}
      </h3>
      <div>
        {children}
      </div>
    </div>
  );
}
function WhiteBox3({
 children,
 title,
}: WhiteBoxProps) {
  return (
    <div className={`w-[416px] h-full bg-white rounded-[20px] p-[24px]`}>
      <h3 className="font-bold text-[20px]">
        {title}
      </h3>
      <div>
        {children}
      </div>
    </div>
  );
}