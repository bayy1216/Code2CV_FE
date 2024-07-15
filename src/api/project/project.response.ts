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

export interface ProjectAnalysisMetaModel {
  id: number;
  projectUrl: string;
  projectName: string;
  starsCount: number;
  forksCount: number;
  startAt: string;
  updatedAt: string;
  language?: string;
  contributorCount: number;
  imageUrl?: string;
}
export interface ContributorModel {
  githubUsername: string;
  contributions: number;
}

export interface ProjectWithMetaModel extends ProjectModel {
  languageInfo: Map<string, number>;
  contributors: ContributorModel[];
}

export interface ProjectAnalysisDetailModel {
  project: ProjectWithMetaModel;
  projectAnalysis: ProjectAnalysis;
  contributors: ProjectContributorModel[];
  usingLanguages: ProjectUsingLanguageModel[];
}
export interface ProjectAnalysis {
  usingFrameworks: string[];
  commitAnalysis: string[];
  contributeInfo: string[];
  commitsByFolder: number;
  detailDescription: string;
  imageUrl?: string;
}


export interface ProjectContributorModel{
  githubUsername: string;
  commitCount: number;
  addedLines: number;
  deletedLines: number;
  usingLanguages: string[];
}

export interface ProjectUsingLanguageModel{
  language: string;
  bytesOfCode: number;
  commitCount: number;
  addedLines: number;
  deletedLines: number;
}


