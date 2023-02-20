import { MessageType } from '@/types/MessageType';
import supabase from '@/services/supabase';

chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case MessageType.GENERATE_REQUEST:
      const sendMessage: any = {
        type: undefined,
        data: null
      };
      const { data, error } = await supabase.functions.invoke('generate', {
        body: { jobDescription: message.data.jobDescription }
      });

      // const data = true, error = false;
      if (data) {
        try {
          const parsed = JSON.parse(data.data);
          
          const userTechnologies: string[] = ['React', 'TypeScript', 'Redux', 'CSS', 'HTML'];
          const technologies = parsed.programmingLanguagesAndLibraries.map((item: string) => {
            return { title: item, included: userTechnologies.includes(item) };
          });

          sendMessage.type = MessageType.GENERATE_RESPONSE;
          sendMessage.data = {
            technologies,
            questions: parsed.interviewQuestions
            // questions: ['1. Question 1', '2. Question 2', '3. Question 3']
          };
        } catch (error) {
          sendMessage.type = MessageType.GENERATE_ERROR;
          sendMessage.data = error;
        }
      } else if (error) {
        sendMessage.type = MessageType.GENERATE_ERROR;
        sendMessage.data = error;
      }

      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, sendMessage);
      });
    break;
  }
});