import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ProjectAnalysisDetailModel} from "@/api/project/project.response.ts";
import {getProjectAnalysisDetailById} from "@/api/project/analyze.api.ts";
import {ApiError} from "@/api/ApiError.ts";

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
    <div className="flex flex-col items-center w-full">
      <div className="w-[1080px]">

        <h1 className="font-bold text-[24px] w-full items-start mb-[24px]">
          분석 결과
        </h1>
        <div className="flex flex-row h-[604px]">

          <div className="w-[640px] h-full flex flex-col">
            <div className="flex flex-row justify-between">
              <WhiteBox title={"기여도"}>

              </WhiteBox>
              <WhiteBox title={"사용언어"}>


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
            <WhiteBox title={"구현한 기능"} width="full">

            </WhiteBox>

          </div>
          <div className="w-[24px]"/>

          <WhiteBox title={"개선 내용 추천"} width="416" height={"full"}>
          </WhiteBox>
        </div>
        <WhiteBox title={"메모"} width={"full"} height={"5000px"} >

        </WhiteBox>
      </div>
    </div>
  );
}

interface WhiteBoxProps {
  children?: React.ReactNode;
  title: string;
  width?: string;
  height?: string;
}
function WhiteBox({
  children,
  title,
  width = "640",
  height = "200"
}: WhiteBoxProps) {
  return (
    <div className={`w-[${width}px] h-[${height}px] bg-white rounded-[20px] p-[24px]`}>
      <h3 className="font-bold text-[20px]">
        {title}
      </h3>
      <div>
      {children}
      </div>
    </div>
  );
}