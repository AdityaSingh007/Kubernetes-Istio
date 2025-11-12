import { Route } from '@angular/router';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  { path: 'frontend-ui', component: Home },
  { path: '', component: Home },
  { path: '**', component: Home },
];
