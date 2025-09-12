import { Routes } from '@angular/router';
import { RulesReferenceComponent } from './rules-reference/rules-reference.component';
import { MartialManueversSearchComponent } from './martial-manuevers-search/martial-manuevers-search.component';
import { SpellsSearchComponent } from './spells-search/spells-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { ClassesOverviewComponent } from './classes-overview/classes-overview.component';

export const routes: Routes = [
    {
        path: '',
        component: TODO,
        title: 'Reclaim the Realm - Basic Rules'
    },
    {
        path: '/player-rules',
        component: TODO,
        title: 'Reclaim the Realm - Player Rules'
    },
    {
        path: '/rules',
        component: RulesReferenceComponent,
        title: 'Reclaim the Realm - Rules Reference'
    },
    {
        path: 'classes',
        component: ClassesOverviewComponent,
        title: 'Reclaim the Realm - Classes'
    },
    {
        path: 'martial-maneuvers',
        component: MartialManueversSearchComponent,
        title: 'Reclaim the Realm - Martial Maneuvers'
    },
    {
        path: 'spells',
        component: SpellsSearchComponent,
        title: 'Reclaim the Realm - Spells'
    },
    {
        path: 'equipment',
        component: EquipmentSearchComponent,
        title: 'Reclaim the Realm - Equipment'
    }
];
