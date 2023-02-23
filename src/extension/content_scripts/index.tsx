import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import Wrapper from '@/components/wrapper/Wrapper';
import { MessageType } from '@/types/MessageType';
import {
  LINKEDIN_JOB_DESCRIPTION_CONTAINER,
  LINKEDIN_JOB_DESCRIPTION_CONTENT,
  LINKEDIN_JOB_DESCRIPTION_FOOTER
} from '@/utils/interfaceSelectors';


let font: HTMLLinkElement = document.querySelector('.spot-fonts');
if (!font) {
  font = document.createElement('link');
  font.classList.add('spot-fonts');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&&family=Space+Grotesk:wght@500;600&display=swap';
  (document.head || document.documentElement).appendChild(font);
}


// Message
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case MessageType.GENERATE_RESPONSE:
      const container: HTMLElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
      if (window.location.href.includes('/jobs/view/') && container) {
        const boxRoot: HTMLDivElement = container.parentElement.querySelector('.spot-box-root');
        if (boxRoot) {
          boxRoot.innerHTML = '';

          const footer: HTMLDivElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_FOOTER);
          if (footer) {
            footer.style.setProperty('display', 'none', 'important');
          }

          let reactElement: Root = createRoot(boxRoot);
          reactElement.render(<Wrapper data={message.data} />);

          container.style.setProperty('display', 'none', 'important');
        }
      }
    break;

    case MessageType.GENERATE_ERROR:
      console.log(message);
    break;
  }
});


// Functions
const renderBox = (element: Element, jobDescription: string) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add('spot-box-root');
  element.insertAdjacentElement('beforebegin', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box jobDescription={jobDescription} />);
};


// DOM
new MutationObserver((mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (window.location.href.includes('/jobs/view/') && element.matches(LINKEDIN_JOB_DESCRIPTION_CONTAINER)) {
        const jobDescription: HTMLDivElement = element.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTENT);
        if (jobDescription) {
          renderBox(element, jobDescription.textContent);
        }
      }
    }
  }
}).observe(document.body, {
  subtree: true,
  childList: true
});

const container = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
if (window.location.href.includes('/jobs/view/') && container) {
  const jobDescription: HTMLDivElement = container.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTENT);
  if (jobDescription) {
    renderBox(container, jobDescription.textContent);
  }
}