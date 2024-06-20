import {useQuery} from "@tanstack/react-query";
import {ProjectDetailModel, ProjectModel} from "@/api/project/project.response.ts";
import {getProjectDetails, getProjects} from "@/api/project/project.api.ts";
import {ProjectList} from "@/pages/(afterLogin)/dashboard/components/ProjectItem.tsx";
import {AfterAnalysisProjectList} from "@/pages/(afterLogin)/dashboard/components/AfterAnalysisProjectItem.tsx";

export default function ProjectPage() {
  const projects = useQuery<ProjectModel[]>({
      queryKey: ['project'],
      queryFn: getProjects,
  });

  const projectDetails = useQuery<ProjectDetailModel[]>({
    queryKey: ['projectDetail'],
    queryFn: getProjectDetails,
  });


  return (
    <div className="w-full h-full flex flex-row justify-center pt-4">
      <ProjectList projects={projects.data}/>
      <div className="w-4"></div>
      <AfterAnalysisProjectList projectDetails = {projectDetails.data}/>
    </div>
  );
}

