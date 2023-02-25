import { getUser, getUserData, invokeGenerate, refreshSession, updateUserData } from '@/services/supabase';
import { Request, RequestType, ResponseCallback } from '@/types/RequestResponse';
import { STORAGE_AUTH_KEY } from '@/utils/storageKeys';
import { mutate } from 'swr';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});

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

    case RequestType.GENERATE:
      const result = await chrome.storage.local.get([STORAGE_AUTH_KEY]);
      if (!(result && result[STORAGE_AUTH_KEY])) {
        sendResponse({ data: null, error: 'Please log in.' });
        return;
      }

      const getUserResponse = await getUser(result[STORAGE_AUTH_KEY].access_token);
      if (getUserResponse?.error) {
        const refreshSessionResponse = await refreshSession(result[STORAGE_AUTH_KEY].refresh_token);
        console.log('refreshSession', refreshSessionResponse);
        // update storage session from STORAGE_AUTH_KEY
        // sendResponse({ data: null, error: getUserResponse?.error?.message });
        // return;
      }

      const getUserDataResponse = await getUserData(getUserResponse?.data.user.id);
      if (getUserDataResponse?.error) {
        sendResponse({ data: null, error: getUserDataResponse?.error?.message });
        return;
      }
      
      const updateUserDataResponse = await updateUserData(getUserResponse?.data.user.id, {
        spots: getUserDataResponse?.data.data.spots - 1
      });
      if (updateUserDataResponse?.error) {
        sendResponse({ data: null, error: updateUserDataResponse?.error?.message });
        return;
      }

      mutate('/userData');

      // const invokeGenerateResponse = await invokeGenerate({
      //   userCountry: getUserResponse.data.user.user_metadata.country,
      //   jobDescription: request.data.jobDescription
      // });
      // if (invokeGenerateResponse?.error) {
      //   sendResponse({ data: null, error: invokeGenerateResponse?.error?.message });
      //   return;
      // }

      try {
        // const parsed = JSON.parse(invokeGenerateResponse.data.data);
        
        // const userTechnologies: string[] = ['React', 'TypeScript', 'Redux', 'CSS', 'HTML'];
        // const technologies = parsed.programmingLanguagesAndLibraries.map((item: string) => {
        //   return { title: item, included: userTechnologies.includes(item) };
        // });

        sendResponse({
          data: {
            technologies: [{ title: 'React', included: true }, { title: 'HTML', included: true }, { title: 'Redux', included: false }],
            // questions: parsed.interviewQuestions,
            // salaryRange: parsed.salaryRangeForPosition,
            questions: ['Question 1', 'Question 2', 'Question 3'],
            salaryRange: { min: 8000, max: 12000, currency: 'RON' }
          },
          error: null
        });
      } catch (error) {
        sendResponse({ data: null, error: error });
      }
    break;
  }
};