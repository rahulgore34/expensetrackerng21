import { Routes } from '@angular/router';

import { MyareaComponent } from './myarea.component';
import { ChildplayareaComponent } from './childplayarea.component';
import { MyexpnsesComponent } from './myexpnses/myexpnses.component';
import { Expensedashboard } from './expensedashboard/expensedashboard';

export const MYAREA_ROUTES: Routes = [
  {
    path: '',
    component: MyareaComponent,
    children: [
      {
        path: '',
        redirectTo: 'expensedashboard',
        pathMatch: 'full'
      },
      {
        path: 'childplayarea',
        component: ChildplayareaComponent
      },
      {
        path: 'myexpnses',
        component: MyexpnsesComponent
      },
      {
        path: 'expensedashboard',
        component: Expensedashboard
      }
    ]
  }
];
