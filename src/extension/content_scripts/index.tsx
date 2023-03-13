import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import {
  LINKEDIN_JOB_DESCRIPTION,
  LINKEDIN_JOB_DESCRIPTION_CONTENT,
  SPOT_BOX_ROOT_CLASSNAME
} from '@/utils/interfaceSelectors';
import { jobIdParser } from '@/utils/jobIdParser';
import { sendRequest, Request, RequestType, ResponseCallback } from '@/types/RequestResponse';
import { GenerateData } from '@/typings';


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
};


// Functions
const renderBox = (element: Element, jobDescription: string = null, generateData: GenerateData = null) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add(SPOT_BOX_ROOT_CLASSNAME);
  element.insertAdjacentElement('beforebegin', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box jobDescription={jobDescription} generateData={generateData} />);
};


// DOM
new MutationObserver(async (mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (window.location.href.includes('/jobs/view/') && element.matches(LINKEDIN_JOB_DESCRIPTION)) {
        const jobDescriptionContent: HTMLDivElement = element.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTENT);
        if (jobDescriptionContent) {
          const jobId = jobIdParser(window.location.href);
          if (jobId) {
            const checkExistsResponse = await sendRequest({
              type: RequestType.CHECK_EXISTS,
              data: { jobId }
            });
            if (checkExistsResponse?.error) {
              renderBox(element, jobDescriptionContent.textContent, null);
              return;
            }
            
            renderBox(element, null, checkExistsResponse?.data.data);
            return;
          }
          
          renderBox(element, jobDescriptionContent.textContent, null);
        }
      }
    }
  }
}).observe(document.body, {
  subtree: true,
  childList: true
});