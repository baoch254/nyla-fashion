import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { nlShoppingCart } from './svg/shopping-cart';
import { nlWishListHeart } from './svg/wishlist-heart';
import { nlHamburgerMenu } from './svg/hamburger-menu';
import { nlChevronRight } from './svg/chevron-right';
import { nlChevronDown } from './svg/chevron-down';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SvgIconsModule.forRoot({
      sizes: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        xxl: '30px',
      },
      defaultSize: 'md',
      icons: [
        nlShoppingCart,
        nlWishListHeart,
        nlHamburgerMenu,
        nlChevronRight,
        nlChevronDown,
      ],
    }),
  ],
  exports: [SvgIconsModule],
})
export class IconModule {}
