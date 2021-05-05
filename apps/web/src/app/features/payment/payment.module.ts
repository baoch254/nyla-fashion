import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

const paymentRoutes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [
    RadioButtonModule,
    InputTextModule,
    InputMaskModule,
    CardModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(paymentRoutes),
  ],
  declarations: [PaymentComponent],
})
export class PaymentModule {}
