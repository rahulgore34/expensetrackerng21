import { Routes } from '@angular/router';

import { MyareaComponent } from './myarea.component';
import { ChildplayareaComponent } from './childplayarea.component';
import { MyexpnsesComponent } from './myexpnses/myexpnses.component';

export const MYAREA_ROUTES: Routes = [
  {
    path: '',
    component: MyareaComponent,
    children: [
      {
        path: '',
        redirectTo: 'childplayarea',
        pathMatch: 'full'
      },
      {
        path: 'childplayarea',
        component: ChildplayareaComponent
      },
      {
        path: 'myexpnses',
        component: MyexpnsesComponent
      }
    ]
  }
];
