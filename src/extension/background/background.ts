import { getUserQueriesByJobId, getUser, getUserData, insertQuery, invokeGenerate, updateUserData } from '@/services/supabase';
import { Request, RequestType, Response, ResponseCallback } from '@/types/RequestResponse';
import { STORAGE_AUTH_KEY } from '@/utils/storageKeys';
import { mutate } from 'swr';

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});

const _getUser = async (): Promise<Response> => {
  const result = await chrome.storage.local.get([STORAGE_AUTH_KEY]);
  if (!(result && result[STORAGE_AUTH_KEY])) {
    return { data: null, error: 'Please log in.' };
  }

  const getUserResponse = await getUser(result[STORAGE_AUTH_KEY].access_token);
  if (getUserResponse?.error) {
    chrome.storage.local.remove([STORAGE_AUTH_KEY]);
    return { data: null, error: 'Please log in.' };
  }

  return { data: getUserResponse.data, error: null };
};

const handleMessage = async (request: Request, sendResponse: ResponseCallback) => {
  switch (request.type) {
    case RequestType.SET_SESSION:
      chrome.storage.local.set({ [STORAGE_AUTH_KEY]: request.data.session });
      sendResponse({ data: null, error: null });
    break;

    case RequestType.REMOVE_SESSION:
      chrome.storage.local.remove([STORAGE_AUTH_KEY]);
      sendResponse({ data: null, error: null });
    break;

    case RequestType.CHECK_EXISTS:
      const getUser_User = await _getUser();
      if (getUser_User?.error) {
        sendResponse({ data: null, error: getUser_User.error });
        return;
      }

      const checkExists_getUserData = await getUserData(getUser_User?.data.user.id);
      if (checkExists_getUserData?.error) {
        sendResponse({ data: null, error: checkExists_getUserData?.error?.message });
        return;
      }

      const checkExists = await getUserQueriesByJobId(getUser_User?.data.user.id, request.data.jobId);
      if (checkExists?.error) {
        sendResponse({ data: null, error: checkExists.error?.message });
        return;
      }

      sendResponse({ data: {
        queryData: checkExists?.data.data,
        userSkills: checkExists_getUserData?.data?.data?.skills
      }, error: null });
    break;

    case RequestType.GENERATE:
      const generate_User = await _getUser();
      if (generate_User?.error) {
        sendResponse({ data: null, error: generate_User.error });
        return;
      }

      const generate_checkExists = await getUserQueriesByJobId(generate_User?.data.user.id, request.data.jobId);
      if (generate_checkExists?.data?.job_id) {
        sendResponse({ data: null, error: 'Already generated a response for this job.' });
        return;
      }

      const getUserDataResponse = await getUserData(generate_User?.data.user.id);
      if (getUserDataResponse?.error) {
        sendResponse({ data: null, error: getUserDataResponse?.error?.message });
        return;
      }

      if (getUserDataResponse?.data.data.spots === 0) {
        sendResponse({ data: null, error: 'No more Spots left.' });
        return;
      }

      const invokeGenerateResponse = await invokeGenerate({
        userCountry: generate_User?.data.user.user_metadata.country,
        jobDescription: request.data.jobDescription
      });

      // console.log('generateInvoke', invokeGenerateResponse);
      
      if (invokeGenerateResponse?.error || !invokeGenerateResponse?.data) {
        sendResponse({ data: null, error: 'Could not generate response.' });
        return;
      }

      const updateUserDataResponse = await updateUserData(generate_User?.data.user.id, {
        ...getUserDataResponse?.data.data,
        spots: getUserDataResponse?.data.data.spots - 1
      });
      if (updateUserDataResponse?.error) {
        sendResponse({ data: null, error: updateUserDataResponse?.error?.message });
        return;
      }
      mutate('/user');
      
      try {
        const replaced = invokeGenerateResponse?.data.data.replace(/“|”/g, '\"');

        const parsed = JSON.parse(replaced);

        const queryData = {
          technologies: parsed.programmingLanguages,
          interviewQuestions: parsed.interviewQuestions,
          positionTitle: parsed.positionTitle,
          experienceLevel: parsed.experienceLevel,
          salaryForPosition: parsed.salaryForPosition,
          /*technologies: [
            { title: 'HTML', yearsOfExperience: 4 },
            { title: 'CSS', yearsOfExperience: 4 },
            { title: 'JavaScript', yearsOfExperience: 3 },
            { title: 'React', yearsOfExperience: 2 },
            { title: 'Redux', yearsOfExperience: -1 },
            { title: 'Mocha', yearsOfExperience: -1 },
            { title: 'Jest', yearsOfExperience: -1 }
          ],
          interviewQuestions: [
            'What is your experience with React.js?',
            'How do you approach testing in React.js projects?',
            'Can you walk us through a recent project you worked on using React.js?',
            'What is your experience with Redux and Flux?',
            'How do you optimize the performance of React.js applications?'
          ],
          positionTitle: 'React Developer',
          experienceLevel: 'Mid',
          salaryForPosition: { suitable: 10000, min: 7000, max: 14000, currencyCode: 'RON' }*/
        };

        const insertQueryResponse = await insertQuery({
          userId: generate_User?.data.user.id,
          jobId: request.data.jobId,
          queryData,
          usage: invokeGenerateResponse?.data?.usage
        });
        if (insertQueryResponse?.error) {
          sendResponse({ data: null, error: insertQueryResponse?.error?.message });
          return;
        }

        sendResponse({
          data: {
            queryData,
            userSkills: getUserDataResponse?.data?.data?.skills
          },
          error: null
        });
      } catch (error) {
        console.log('generateError', error);
        
        sendResponse({ data: null, error: 'Could not generate response.' });
      }
    break;
  }
};