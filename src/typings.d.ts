type UserDataOpenAIAPI = {
  key: string;
  updatedAt: string;
};

type UserDataExperience = {
  jobTitle: string;
  yearsOfExperience: string;
};

type UserDataEducation = {
  title: string;
  years: string;
};

type UserDataSkills = {
  title: string;
  yearsOfExperience: number;
};

export interface UserData {
  openAIAPI: UserDataOpenAIAPI;
  fullName: string;
  country: string;
  experience: UserDataExperience;
  education: UserDataEducation | null;
  skills: UserDataSkills[];
}

export type TechnologyItem = {
  title: string;
  yearsOfExperience: number;
};

export type SalaryForPosition = {
  suitable: number;
  min: number;
  max: number;
  currencyCode: string;
};

export type QueryUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type QueryData = {
  jobId: string;
  technologies: TechnologyItem[];
  interviewQuestions: string[];
  jobTitle: string;
  experienceLevel: string;
  salaryForPosition: SalaryForPosition;
  usage: QueryUsage;
  createdAt: string;
};

export type BoxData = {
  queryData: QueryData;
  userSkills: TechnologyItem[];
};
