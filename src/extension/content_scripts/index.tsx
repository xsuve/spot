import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import {
  LINKEDIN_JOB_DESCRIPTION,
  LINKEDIN_JOB_DESCRIPTION_CONTENT,
  SPOT_BOX_ROOT_CLASSNAME,
} from '@/utils/interfaceSelectors';
import { jobIdParser } from '@/utils/jobIdParser';
import {
  sendRequest,
  Request,
  RequestType,
  ResponseCallback,
  ResponseErrorType,
} from '@/types/RequestResponse';
import { BoxData } from '@/typings';

let font: HTMLLinkElement = document.querySelector('.spot-fonts');
if (!font) {
  font = document.createElement('link');
  font.classList.add('spot-fonts');
  font.rel = 'stylesheet';
  font.href =
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&family=Space+Grotesk:wght@500&display=swap';
  (document.head || document.documentElement).appendChild(font);
}

// Message
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});

const handleMessage = async (
  request: Request,
  sendResponse: ResponseCallback
) => {};

// Functions
const renderBox = (
  element: Element,
  jobDescription: string = null,
  boxData: BoxData = null
) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add(SPOT_BOX_ROOT_CLASSNAME);
  element.insertAdjacentElement('beforebegin', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(
    <Box jobDescription={jobDescription} boxData={boxData} />
  );
};

const handleChecks = async (element: HTMLElement) => {
  const jobDescriptionContent: HTMLDivElement = element.querySelector(
    LINKEDIN_JOB_DESCRIPTION_CONTENT
  );
  if (jobDescriptionContent) {
    const jobId = jobIdParser(window.location.href);
    if (jobId) {
      const renderChecksResponse = await sendRequest({
        type: RequestType.RENDER_CHECKS,
        data: { jobId },
      });

      if (
        renderChecksResponse.error &&
        renderChecksResponse.error.type === ResponseErrorType.NO_USER
      ) {
        return;
      }

      if (renderChecksResponse.data) {
        renderBox(element, null, renderChecksResponse.data);
        return;
      }
    }

    renderBox(element, jobDescriptionContent.textContent, null);
  }
};

// DOM
(async () => {
  const container: HTMLElement = document.querySelector(
    LINKEDIN_JOB_DESCRIPTION
  );
  if (window.location.href.includes('/jobs/view/') && container) {
    handleChecks(container);
  }

  new MutationObserver(async (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      for (const element of mutation.addedNodes) {
        if (!(element instanceof HTMLElement)) continue;

        if (
          window.location.href.includes('/jobs/view/') &&
          element.matches(LINKEDIN_JOB_DESCRIPTION)
        ) {
          handleChecks(element);
        }
      }
    }
  }).observe(document.body, {
    subtree: true,
    childList: true,
  });
})();
