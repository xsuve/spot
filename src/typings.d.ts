export type SalaryForPosition = {
  suitable: number;
  min: number;
  max: number;
  currencyCode: string;
};

export type TechnologyItem = {
  title: string;
  yearsOfExperience: number;
};

export type QueryData = {
  technologies: TechnologyItem[];
  interviewQuestions: string[];
  positionTitle: string;
  experienceLevel: string;
  salaryForPosition: SalaryForPosition;
};

export type BoxData = {
  queryData: QueryData;
  userSkills: TechnologyItem[];
};