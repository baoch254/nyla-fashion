import { NLBreadCrumbModule } from './../../core-ui';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [{ path: '', component: WelcomeComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes), NLBreadCrumbModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
