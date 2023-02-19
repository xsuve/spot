import { MessageType } from '@/types/MessageType';
import { TechnologyItem } from '@/types/TechnologyItem';
import supabase from '@/services/supabase';
import { parseTechnologies } from '@/services/technologiesParser';

chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case MessageType.GENERATE_REQUEST:
      const jobDescriptionTechnologies: string[] = parseTechnologies(message.data.jobDescription);
      const userTechnologies: string[] = ['React', 'TypeScript'];
      const technologies: TechnologyItem[] = jobDescriptionTechnologies.map(item => {
        return { title: item, included: userTechnologies.includes(item) };
      });

      const sendMessage: any = {
        type: undefined,
        data: null
      };
      // const { data, error } = await supabase.functions.invoke('generate_interview_questions', {
      //   body: { jobDescription: message.data.jobDescription }
      // });

      const data = true, error = false;
      if (data) {
        sendMessage.type = MessageType.GENERATE_RESPONSE;
        sendMessage.data = {
          technologies,
          // questions: data.data.split('\n')
          questions: ['1. Question 1', '2. Question 2', '3. Question 3']
        };
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