import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import Wrapper from '@/components/wrapper/Wrapper';
import { MessageType } from '@/types/MessageType';

let font: HTMLLinkElement = document.querySelector('.spot-fonts');
if (!font) {
  font = document.createElement('link');
  font.classList.add('spot-fonts');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&&family=Space+Grotesk:wght@500;600&display=swap';
  (document.head || document.documentElement).appendChild(font);
}


const CONTAINER = 'section.jobs-unified-description';
const CONTAINER_JOB_DESCRIPTION = 'div.jobs-unified-description__content';


// Message
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case MessageType.GENERATE_RESPONSE:
      const container: HTMLElement = document.querySelector(CONTAINER);
      if (window.location.href.includes('/jobs/view/') && container) {
        const boxRoot: HTMLDivElement = container.parentElement.querySelector('.spot-box-root');
        if (boxRoot) {
          boxRoot.innerHTML = '';

          let reactElement: Root = createRoot(boxRoot);
          reactElement.render(<Wrapper data={message.data} />);

          container.style.setProperty('display', 'none', 'important');
        }
      }
    break;
  }
});


// Functions
const renderBox = (element: Element, jobDescription: string) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add('spot-box-root', 'mb-[1.6rem]');
  element.insertAdjacentElement('beforebegin', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box jobDescription={jobDescription} />);
};


// DOM
new MutationObserver((mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (window.location.href.includes('/jobs/view/') && element.matches(CONTAINER)) {
        const jobDescription: HTMLDivElement = element.querySelector(CONTAINER_JOB_DESCRIPTION);
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

const container = document.querySelector(CONTAINER);
if (window.location.href.includes('/jobs/view/') && container) {
  const jobDescription: HTMLDivElement = container.querySelector(CONTAINER_JOB_DESCRIPTION);
  if (jobDescription) {
    renderBox(container, jobDescription.textContent);
  }
}