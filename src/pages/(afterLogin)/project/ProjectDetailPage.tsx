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
    <div>
      {JSON.stringify(data)}
    </div>
  );
}