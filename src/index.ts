import { View } from './app/components/views/view';

const root = document.querySelector('main');
if (!(root instanceof HTMLElement)) {
  throw new Error('Element "Main" not found');
}

const app = new View(root);
