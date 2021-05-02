import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/category-list/category-list.module').then(
            (m) => m.CategoryListModule
          ),
      },
    ],
  },
];
