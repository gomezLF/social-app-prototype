import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialTabPage } from './initial-tab.page';

const routes: Routes = [
  {
    path: '',
    component: InitialTabPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'publish',
        loadChildren: () => import('../publish/publish.module').then( m => m.PublishPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialTabPageRoutingModule {}
