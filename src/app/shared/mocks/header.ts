import { menuLabels } from '@/locales/pt-BR/menu';

export const menus = [
  {
    label: menuLabels.categories,
    submenu: [menuLabels.category1, menuLabels.category2, menuLabels.category3],
  },
  {
    label: menuLabels.subjects,
    submenu: [menuLabels.subject1, menuLabels.subject2],
  },
  {
    label: menuLabels.otherPages,
    submenu: [menuLabels.page1, menuLabels.page2],
  },
  { label: menuLabels.myList },
  { label: menuLabels.lives },
  { label: menuLabels.forum },
];
