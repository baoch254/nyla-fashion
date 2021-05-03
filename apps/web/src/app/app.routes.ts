import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home').then((m) => m.HomeModule),
      },
      {
        path: 'shop',
        loadChildren: () => import('./features/shop').then((m) => m.ShopModule),
      },
    ],
  },
];
