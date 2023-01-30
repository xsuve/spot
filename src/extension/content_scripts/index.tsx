import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@/components/box/Box';
import Wrapper from '@/components/wrapper/Wrapper';
import { MessageType } from '@/types/MessageType';


const CONTAINER = 'section.jobs-unified-description';
const CONTAINER_CONTENT = 'div.jobs-unified-description__content';


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
          
          // const content: HTMLDivElement = container.querySelector(CONTAINER_CONTENT);
          // if (content) {
          //   container.removeChild(root);

          //   content.style.overflow = 'hidden';
          //   content.style.height = '0px';

          //   const wrapperRoot = document.createElement('div');
          //   wrapperRoot.classList.add('spot-wrapper-root', 'mt-[24px]');
          //   container.insertAdjacentElement('beforeend', wrapperRoot);
          //   reactElement = createRoot(wrapperRoot);
          //   reactElement.render(<Wrapper data={message.data} />);
          // }
        }
      }
    break;
  }
});


// Functions
const renderBox = (element: Element, content: string) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add('spot-box-root', 'mb-[1.6rem]');
  element.insertAdjacentElement('beforebegin', root);
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