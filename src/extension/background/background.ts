import { MessageType } from '@/types/MessageType';
import supabase from '@/services/supabase';

chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case MessageType.GENERATE_REQUEST:
      // TODO: parse technologies & API - message.data.content
      const technologies: string[] = [];
      if (
        message.data.content.toLowerCase().includes('React'.toLowerCase())
      ) {
        technologies.push('React');
      }
      if (
        message.data.content.toLowerCase().includes('Jest'.toLowerCase())
      ) {
        technologies.push('Jest');
      }
      if (
        message.data.content.toLowerCase().includes('JavaScript'.toLowerCase())
      ) {
        technologies.push('JavaScript');
      }

      const sendMessage: any = {
        type: undefined,
        data: null
      };
      const { data, error } = await supabase.functions.invoke('generate_interview_questions', {
        body: { jobDescription: message.data.content }
      });

      if (data) {
        sendMessage.type = MessageType.GENERATE_RESPONSE;
        sendMessage.data = {
          technologies,
          questions: data.data.split('\n')
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