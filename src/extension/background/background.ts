import { MessageType } from '@/types/MessageType';
import supabase from '@/services/supabase';

chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case MessageType.SET_SESSION:
      chrome.storage.local.set({ 'sb-session': message.data.session?.access_token });
    break;
    case MessageType.REMOVE_SESSION:
      chrome.storage.local.remove('sb-session');
    break;

    case MessageType.GENERATE_REQUEST:
      chrome.storage.local.get('sb-session', async (result) => {
        const sendMessage: any = {
          type: undefined,
          data: null
        };

        if (result['sb-session']) {
          const { data: { user } } = await supabase.auth.getUser(result['sb-session']);
          if (user) {
            // const { data, error } = await supabase.functions.invoke('generate', {
            //   body: {
            //     userCountry: user.user_metadata.country,
            //     jobDescription: message.data.jobDescription
            //   }
            // });
      
            const data = true, error = false, technologies = [{ title: 'React', included: true }, { title: 'HTML', included: true }, { title: 'Redux', included: false }];
            if (data) {
              try {
                // const parsed = JSON.parse(data.data);
                
                // const userTechnologies: string[] = ['React', 'TypeScript', 'Redux', 'CSS', 'HTML'];
                // const technologies = parsed.programmingLanguagesAndLibraries.map((item: string) => {
                //   return { title: item, included: userTechnologies.includes(item) };
                // });
      
                sendMessage.type = MessageType.GENERATE_RESPONSE;
                sendMessage.data = {
                  technologies,
                  // questions: parsed.interviewQuestions,
                  // salaryRange: parsed.salaryRangeForPosition,
                  questions: ['Question 1', 'Question 2', 'Question 3'],
                  salaryRange: { min: 8000, max: 12000, currency: 'RON' }
                };
              } catch (error) {
                sendMessage.type = MessageType.GENERATE_ERROR;
                sendMessage.data = error;
              }
            } else if (error) {
              sendMessage.type = MessageType.GENERATE_ERROR;
              sendMessage.data = error;
            }
          } else {
            sendMessage.type = MessageType.GENERATE_ERROR;
            sendMessage.data = 'Something went wrong.';
          }
        }

        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, sendMessage);
        });
      });
    break;
  }
});