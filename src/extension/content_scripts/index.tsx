import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import '@/styles.css';
import Box from '@components/box/Box';


// Functions
const renderBox = (element: Element) => {
  const root: HTMLDivElement = document.createElement('div');
  root.classList.add('mt-[100px]');
  element.insertAdjacentElement('beforeend', root);
  const reactElement: Root = createRoot(root);
  reactElement.render(<Box />);
};


const CONTAINER = 'section.jobs-unified-description';

new MutationObserver((mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    for (const element of mutation.addedNodes) {
      if (!(element instanceof HTMLElement)) continue;

      if (element.matches(CONTAINER)) {
        renderBox(element);
      }
    }
  }
}).observe(document.body, {
  subtree: true,
  childList: true
});

const container = document.querySelector(CONTAINER);
if (container) {
  renderBox(container);
}