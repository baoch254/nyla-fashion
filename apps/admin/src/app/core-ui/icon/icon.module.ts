import { nlHamburgerMenu } from './svg/hamburger-menu';
import { nlChevronDoubleLeft } from './svg/chevron-double-left';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { nlChevronDoubleRight } from './svg/chevron-double-right';

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
      icons: [nlChevronDoubleLeft, nlChevronDoubleRight, nlHamburgerMenu],
    }),
  ],
  exports: [SvgIconsModule],
})
export class IconModule {}
