export const ROUTE_KEY: {
  [key: string]: { label: string; routerLink?: string };
} = {
  Welcome: {
    label: 'Welcome',
    routerLink: '/welcome',
  },
  Category: {
    label: 'Category',
    routerLink: '/category',
  },
  SubCategory: {
    label: 'Sub Category',
  },
  Product: {
    label: 'Product',
    routerLink: '/product',
  },
  AddProduct: {
    label: 'Add Product',
    routerLink: '/product/add',
  },
  ViewProduct: {
    label: 'View Product',
    routerLink: '/product/view',
  },
  Size: {
    label: 'Size',
    routerLink: '/size',
  },
  Color: {
    label: 'Color',
    routerLink: '/color',
  },
};
