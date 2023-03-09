import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import {
  LINKEDIN_JOB_DESCRIPTION_CONTAINER,
  LINKEDIN_JOB_DESCRIPTION_CONTENT,
  LINKEDIN_JOB_DESCRIPTION_FOOTER,
  SPOT_BOX_ROOT_CLASSNAME
} from '@/utils/interfaceSelectors';
import { jobIdParser } from '@/utils/jobIdParser';
import { sendRequest, Request, RequestType, ResponseCallback } from '@/types/RequestResponse';
import Wrapper from '@/components/wrapper/Wrapper';


let font: HTMLLinkElement = document.querySelector('.spot-fonts');
if (!font) {
  font = document.createElement('link');
  font.classList.add('spot-fonts');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&family=Space+Grotesk:wght@500;600&display=swap';
  (document.head || document.documentElement).appendChild(font);
}


// Message
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});

const handleMessage = async (request: Request, sendResponse: ResponseCallback) => {
  switch (request.type) {
    // case RequestType.CHECK_EXISTS:
    //   const checkExistsResponse = await sendRequest({
    //     type: RequestType.CHECK_EXISTS,
    //     data: {
    //       jobId: request.data.jobId
    //     }
    //   });

    //   if (checkExistsResponse?.error) {
    //     sendResponse({ data: null, error: checkExistsResponse.error });
    //     return;
    //   }

    //   sendResponse({ data: checkExistsResponse?.data, error: null });
    // break;
  }
};


// Functions
const renderBox = (element: Element, jobDescription: string) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add(SPOT_BOX_ROOT_CLASSNAME);
  element.insertAdjacentElement('beforebegin', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box jobDescription={jobDescription} />);
};

const renderWrapper = (element: Element, generateData: any) => {
  const container: HTMLElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
  if (container) {
    const footer: HTMLDivElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_FOOTER);
    if (footer) {
      footer.style.setProperty('display', 'none', 'important');
    }

    const root: HTMLDivElement = document.createElement('div');
    root.classList.add(SPOT_BOX_ROOT_CLASSNAME);
    element.insertAdjacentElement('beforebegin', root);
    const reactElement: Root = createRoot(root);
    reactElement.render(<Wrapper data={generateData} />);

    container.style.setProperty('display', 'none', 'important');
  }
};


// DOM
new MutationObserver(async (mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (window.location.href.includes('/jobs/view/') && element.matches(LINKEDIN_JOB_DESCRIPTION_CONTAINER)) {
        const jobDescription: HTMLDivElement = element.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTENT);
        if (jobDescription) {
          const jobId = jobIdParser(window.location.href);
          if (jobId) {
            const checkExistsResponse = await sendRequest({
              type: RequestType.CHECK_EXISTS,
              data: { jobId }
            });
            if (checkExistsResponse?.error) {
              return;
            }
            
            renderWrapper(element, checkExistsResponse?.data.data);
            return;
          }
          
          renderBox(element, jobDescription.textContent);
        }
      }
    }
  }
}).observe(document.body, {
  subtree: true,
  childList: true
});