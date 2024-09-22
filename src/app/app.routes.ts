import { Routes } from '@angular/router';
import { RulesReferenceComponent } from './rules-reference/rules-reference.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: MainPageComponent,
        title: 'Reclaim the Realm'
    },
    {
        path: 'rules',
        component: RulesReferenceComponent,
        title: 'Reclaim the Realm'
    }
];
