import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./features/welcome').then((m) => m.WelcomeModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./features/category').then((m) => m.CategoryModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./features/product').then((m) => m.ProductModule),
      },
      {
        path: 'color',
        loadChildren: () =>
          import('./features/color').then((m) => m.ColorModule),
      },
      {
        path: 'size',
        loadChildren: () => import('./features/size').then((m) => m.SizeModule),
      },
    ],
  },
];
