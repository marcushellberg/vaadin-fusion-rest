import { Route } from '@vaadin/router';
import './views/empty/empty-view';

export type ViewRoute = Route & { title?: string; children?: ViewRoute[] };

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'empty-view',
    title: 'Empty',
  },
];
export const routes: ViewRoute[] = [...views];
