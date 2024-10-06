import { Routes } from '@angular/router';
import { RulesReferenceComponent } from './rules-reference/rules-reference.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MartialManueversSearchComponent } from './martial-manuevers-search/martial-manuevers-search.component';
import { SpellsSearchComponent } from './spells-search/spells-search.component';
import { HybridAbilitiesSearchComponent } from './hybrid-abilities-search/hybrid-abilities-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';

export const routes: Routes = [
    {
        path: 'home',
        component: MainPageComponent,
        title: 'Reclaim the Realm'
    },
    {
        path: 'rules',
        component: RulesReferenceComponent,
        title: 'Reclaim the Realm - Rules'
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
        path: 'hybrid-abilities',
        component: HybridAbilitiesSearchComponent,
        title: 'Reclaim the Realm - Hybrid Abilities'
    },
    {
        path: 'equipment',
        component: EquipmentSearchComponent,
        title: 'Reclaim the Realm - Equipment'
    }
];
