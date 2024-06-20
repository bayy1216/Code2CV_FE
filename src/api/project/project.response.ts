export interface ProjectModel {
  id: number;
  projectUrl: string;
  projectName: string;
  starsCount: number;
  forksCount: number;
  startAt: string;
  updatedAt: string;
  language?: string;
}

export interface ProjectDetailModel extends ProjectModel {

  languageInfo: Map<string, number>;
  contributors: ContributorModel[];
}

export interface ProjectAnalysisDetailModel extends ProjectModel{
  analyze: ProjectAnalysis;
}
export interface ProjectAnalysis {
  usingLibrary: string[];
  commitAnalysis: string[];
  contributeInfo: string[];
  contributePercent: number;
  totalCommitsCount: number;
  userCommitsCount: number;
  commitsByFolder: string[];
  detailDescription: string;
}




export interface ContributorModel {
  githubUsername: string;
  contributions: number;
}