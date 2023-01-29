import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import Wrapper from '@/components/wrapper/Wrapper';
import { MessageType } from '@/types/MessageType';


let SAVED_CONTENT: HTMLDivElement;
const CONTAINER = 'section.jobs-unified-description';
const CONTAINER_CONTENT = 'div.jobs-unified-description__content';


// Message
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case MessageType.GENERATE_RESPONSE:
      const container: HTMLElement = document.querySelector(CONTAINER);
      if (window.location.href.includes('/jobs/view/') && container) {
        const root: HTMLDivElement = container.querySelector('.spot-box-root');
        if (root) {
          const content: HTMLDivElement = container.querySelector(CONTAINER_CONTENT);
          if (content) {
            container.removeChild(root);

            SAVED_CONTENT = content;
            content.innerHTML = '';

            const wrapperRoot = document.createElement('div');
            wrapperRoot.classList.add('spot-wrapper-root');
            content.insertAdjacentElement('beforeend', wrapperRoot);

            const reactElement: Root = createRoot(wrapperRoot);
            reactElement.render(<Wrapper data={message.data} />);

            console.log(message.data);
            
          }
        }
      }
    break;
  }
});


// Functions
const renderBox = (element: Element, content: string) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add('spot-box-root', 'mt-[125px]');
  element.insertAdjacentElement('beforeend', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box content={content} />);
};


// DOM
new MutationObserver((mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (window.location.href.includes('/jobs/view/') && element.matches(CONTAINER)) {
        const content: HTMLDivElement = element.querySelector(CONTAINER_CONTENT);
        if (content) {
          renderBox(element, content.textContent);
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
  const content: HTMLDivElement = container.querySelector(CONTAINER_CONTENT);
  if (content) {
    renderBox(container, content.textContent);
  }
}