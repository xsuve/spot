export type SalaryForPosition = {
  suitable: number;
  min: number;
  max: number;
  currencyCode: string;
};

export type TechnologyItem = {
  title: string;
  included: boolean;
};

export type GenerateData = {
  technologies: TechnologyItem[];
  interviewQuestions: string[];
  positionTitle: string;
  experienceLevel: string;
  salaryForPosition: SalaryForPosition;
};