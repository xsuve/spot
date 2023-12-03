import { chromeStorage } from '@/services/chromeStorage';
import { invokeGenerate } from '@/services/supabase';
import {
  Request,
  RequestType,
  ResponseCallback,
  ResponseErrorType,
} from '@/types/RequestResponse';
import { QueryData, UserData } from '@/typings';
import { SPOT_USER_DATA, SPOT_USER_QUERIES } from '@/utils/storageKeys';

// On Install
// chrome.runtime.onInstalled.addListener(async () => {
//   await chromeStorage.set(SPOT_USER_DATA, null);
//   await chromeStorage.set(SPOT_USER_QUERIES, []);
// });

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});

const handleMessage = async (
  request: Request,
  sendResponse: ResponseCallback
) => {
  switch (request.type) {
    case RequestType.RENDER_CHECKS: {
      const user = await chromeStorage.get<UserData>(SPOT_USER_DATA);
      if (!user) {
        sendResponse({
          data: null,
          error: { type: ResponseErrorType.NO_USER },
        });
        return;
      }

      const queries = await chromeStorage.get<QueryData[]>(SPOT_USER_QUERIES);
      if (!queries || queries.length === 0) {
        sendResponse({
          data: null,
          error: { type: ResponseErrorType.NO_QUERIES },
        });
        return;
      }

      const query = queries.find((query) => query.jobId === request.data.jobId);
      if (query) {
        sendResponse({
          data: {
            queryData: query,
            userSkills: user.skills,
          },
          error: null,
        });
        return;
      }

      sendResponse({
        data: null,
        error: null,
      });
      break;
    }

    case RequestType.GENERATE: {
      const user = await chromeStorage.get<UserData>(SPOT_USER_DATA);
      if (!user) {
        sendResponse({
          data: null,
          error: {
            type: ResponseErrorType.NO_USER,
            message: 'Set your account first.',
          },
        });
        return;
      }

      const queries = await chromeStorage.get<QueryData[]>(SPOT_USER_QUERIES);

      if (!user.experience || !user.education || user.skills.length === 0) {
        sendResponse({
          data: null,
          error: {
            type: ResponseErrorType.MESSAGE_ERROR,
            message: 'Complete your profile first.',
          },
        });
        return;
      }

      const invokeGenerateResponse = await invokeGenerate({
        openAIAPIKey: user.openAIAPI.key,
        userCountry: user.country,
        jobDescription: request.data.jobDescription,
      });
      console.log('generateInvoke', invokeGenerateResponse);
      if (invokeGenerateResponse.error || !invokeGenerateResponse.data.data) {
        sendResponse({
          data: null,
          error: {
            type: ResponseErrorType.MESSAGE_ERROR,
            message: 'Could not generate response.',
          },
        });
        return;
      }

      const {
        data: { data, usage },
      } = invokeGenerateResponse;

      const queryData: QueryData = {
        jobId: request.data.jobId,
        createdAt: new Date().toISOString(),
        technologies: data.programmingLanguages,
        interviewQuestions: data.interviewQuestions,
        jobTitle: data.jobTitle,
        experienceLevel: data.experienceLevel,
        salaryForPosition: data.salaryForPosition,
        usage,
        /*technologies: [
          { title: 'HTML', yearsOfExperience: 4 },
          { title: 'CSS', yearsOfExperience: 4 },
          { title: 'JavaScript', yearsOfExperience: 3 },
          { title: 'React', yearsOfExperience: 2 },
          { title: 'Redux', yearsOfExperience: -1 },
          { title: 'Mocha', yearsOfExperience: -1 },
          { title: 'Jest', yearsOfExperience: -1 },
        ],
        interviewQuestions: [
          'What is your experience with React.js?',
          'How do you approach testing in React.js projects?',
          'Can you walk us through a recent project you worked on using React.js?',
          'What is your experience with Redux and Flux?',
          'How do you optimize the performance of React.js applications?',
        ],
        jobTitle: 'React Developer',
        experienceLevel: 'Mid',
        salaryForPosition: {
          suitable: 10000,
          min: 7000,
          max: 14000,
          currencyCode: 'RON',
        },
        usage: {
          promptTokens: 1000,
          completionTokens: 1000,
          totalTokens: 1000,
        },*/
      };

      const newQueries = [...queries, queryData];
      await chromeStorage.set(SPOT_USER_QUERIES, newQueries);

      sendResponse({
        data: {
          queryData,
          userSkills: user.skills,
        },
        error: null,
      });
      break;
    }
  }
};
