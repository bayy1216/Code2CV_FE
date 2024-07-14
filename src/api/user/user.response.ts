export interface UserModel {
  id: number;
  githubName: string;
  githubUsername: string;
  githubBio: string;
  githubCompany: string;
  profileImageUrl: string;
  githubStartAt: string;
}

export interface SkillDashboardResponse {
  languages: UserLanguageModel[];
  frameworks: UserFrameworkModel[];
}

export interface UserLanguageModel {
  name: string;
  addedLines: number;
  deletedLines: number;
  commitCount: number;
  latestUsedDate: string;
}

export interface UserFrameworkModel {
  name: string;
  usedProjectCount: number;
  latestUsedAt: string;
}