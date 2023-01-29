import { MessageType } from '@/types/MessageType';

chrome.runtime.onMessage.addListener((message) => {
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

      setTimeout(() => {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: MessageType.GENERATE_RESPONSE,
            data: {
              technologies,
              questions: ['Question 1', 'Question 2']
            }
          });
        });
      }, 2000);
    break;
  }
});