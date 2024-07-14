import {useQuery} from "@tanstack/react-query";
import {ProjectAnalysisMetaModel, ProjectModel} from "@/api/project/project.response.ts";
import {getProjects} from "@/api/project/project.api.ts";
import {ProjectList} from "@/pages/(afterLogin)/dashboard/components/ProjectItem.tsx";
import {AfterAnalysisProjectList} from "@/pages/(afterLogin)/dashboard/components/AfterAnalysisProjectItem.tsx";
import {getProjectAnalyzeDetails} from "@/api/analyze/analyze.api.ts";

export default function ProjectPage() {
  const projects = useQuery<ProjectModel[]>({
      queryKey: ['project'],
      queryFn: getProjects,
  });

  const projectAnalysisMetas = useQuery<ProjectAnalysisMetaModel[]>({
    queryKey: ['projectAnalysisMeta'],
    queryFn: getProjectAnalyzeDetails,
  });


  return (
    <div className="w-full h-full flex flex-row justify-center pt-4">
      <ProjectList projects={projects.data}/>
      <div className="w-4"></div>
      <AfterAnalysisProjectList projectAnalysisMetas = {projectAnalysisMetas.data}/>
    </div>
  );
}

