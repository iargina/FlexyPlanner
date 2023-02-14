import { Notify } from 'notiflix';

Notify.init({
  showOnlyTheLastOne: true,
  closeButton: true,
  success: {
    background: '#f3bb4a',
    textColor: '#111111',
  },
  info: {
    background: '#f3bb4a',
    textColor: '#111111',
  },
  failure: {
    background: '#f7434b',
    textColor: '#ffffff',
  },
});
