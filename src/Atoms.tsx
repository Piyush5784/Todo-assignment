import { atom } from 'recoil';

export const todoList = atom({
  key: 'todoList',
  default: [
    {
      id: 1,
      title: 'Go to gym',
      completed: false,
    },
  ],
});

export const tongleOpen = atom({
  key: 'tongleOpen',
  default: false,
});

export const Title = atom({
  key: 'title_todo',
  default: '',
});
