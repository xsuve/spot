import { getUserGeneratedByJobId, getUser, getUserData, insertGenerated, invokeGenerate, updateUserData } from '@/services/supabase';
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

      const checkExists = await getUserGeneratedByJobId(getUser_User?.data.user.id, request.data.jobId);
      if (checkExists?.error) {
        sendResponse({ data: null, error: checkExists.error?.message });
        return;
      }

      sendResponse({ data: checkExists?.data, error: null });
    break;

    case RequestType.GENERATE:
      const generate_User = await _getUser();
      if (generate_User?.error) {
        sendResponse({ data: null, error: generate_User.error });
        return;
      }

      const generate_checkExists = await getUserGeneratedByJobId(generate_User?.data.user.id, request.data.jobId);
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

      // const invokeGenerateResponse = await invokeGenerate({
      //   userCountry: generate_User?.data.user.user_metadata.country,
      //   jobDescription: request.data.jobDescription
      // });

      // console.log('generateInvoke', invokeGenerateResponse);
      
      // if (invokeGenerateResponse?.error || !invokeGenerateResponse?.data) {
      //   sendResponse({ data: null, error: 'Could not generate response.' });
      //   return;
      // }

      const updateUserDataResponse = await updateUserData(generate_User?.data.user.id, {
        spots: getUserDataResponse?.data.data.spots - 1
      });
      if (updateUserDataResponse?.error) {
        sendResponse({ data: null, error: updateUserDataResponse?.error?.message });
        return;
      }
      mutate('/userData');
      
      try {
        // const parsed = JSON.parse(invokeGenerateResponse?.data.data);
        // console.log('parsed', parsed);
        
        // const userTechnologies: string[] = ['React', 'TypeScript', 'Redux', 'CSS', 'HTML'];
        // const technologies = parsed.programmingLanguages.map((item: string) => {
        //   return { title: item, included: userTechnologies.includes(item) };
        // });

        const generatedData = {
          // technologies,
          // interviewQuestions: parsed.interviewQuestions,
          // positionTitle: parsed.positionTitle,
          // experienceLevel: parsed.experienceLevel,
          // salaryForPosition: parsed.salaryForPosition,
          technologies: [
            { title: 'HTML', included: true },
            { title: 'CSS', included: true },
            { title: 'JavaScript', included: true },
            { title: 'React', included: true },
            { title: 'Redux', included: false },
            { title: 'Mocha', included: false },
            { title: 'Jest', included: true }
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
          salaryForPosition: { suitable: 10000, min: 7000, max: 14000, currencyCode: 'RON' }
        };

        const insertGeneratedResponse = await insertGenerated(
          generate_User?.data.user.id,
          request.data.jobId,
          generatedData
          // TODO: Add usage from invokeGenerateResponse.
        );
        if (insertGeneratedResponse?.error) {
          sendResponse({ data: null, error: insertGeneratedResponse?.error?.message });
          return;
        }

        sendResponse({
          data: generatedData,
          error: null
        });
      } catch (error) {
        console.log('generateError', error);
        
        sendResponse({ data: null, error: error.message });
      }
    break;
  }
};