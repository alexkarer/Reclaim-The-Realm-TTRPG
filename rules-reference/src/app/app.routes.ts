import { Routes } from '@angular/router';
import { RulesReferenceComponent } from './rules-reference/rules-reference.component';
import { MartialManueversSearchComponent } from './martial-manuevers-search/martial-manuevers-search.component';
import { SpellsSearchComponent } from './spells-search/spells-search.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { ClassesOverviewComponent } from './classes-overview/classes-overview.component';
import { BasicRulesComponent } from './basic-rules/basic-rules.component';
import { StartPageComponent } from './start-page/start-page.component';
import { PlayerRulesLayoutComponent } from './player-rules/player-rules-layout/player-rules-layout.component';
import { CharacterCreationPageComponent } from './player-rules/pages/character-creation-page/character-creation-page.component';
import { SpeciesPageComponent } from './player-rules/pages/species-page/species-page.component';
import { CharacterOriginPageComponent } from './player-rules/pages/character-origin-page/character-origin-page.component';
import { ClassesPageComponent } from './player-rules/pages/classes-page/classes-page.component';
import { AttributesSkillsPageComponent } from './player-rules/pages/attributes-skills-page/attributes-skills-page.component';
import { CharacterValuesPageComponent } from './player-rules/pages/character-values-page/character-values-page.component';
import { PerksAbilitiesPageComponent } from './player-rules/pages/perks-abilities-page/perks-abilities-page.component';
import { FinishCharacterPageComponent } from './player-rules/pages/finish-character-page/finish-character-page.component';
import { EquipmentPageComponent } from './player-rules/pages/equipment-page/equipment-page.component';
import { PartyOriginPageComponent } from './player-rules/pages/party-origin-page/party-origin-page.component';
import { GettingStrongerPageComponent } from './player-rules/pages/getting-stronger-page/getting-stronger-page.component';
import { ExhaustionRestingPageComponent } from './player-rules/pages/exhaustion-resting-page/exhaustion-resting-page.component';
import { SpellsPageComponent } from './player-rules/pages/casting-spells-page/casting-spells-page.component';

export const routes: Routes = [
    {
        path: '',
        component: StartPageComponent,
        title: 'Reclaim the Realm'
    },
    {
        path: 'basic-rules',
        component: BasicRulesComponent,
        title: 'Reclaim the Realm - Basic Rules'
    },
    {
        path: 'player-rules',
        component: PlayerRulesLayoutComponent,
        title: 'Reclaim the Realm - Player Rules',
        children: [
            {
                path: '',
                redirectTo: 'character-creation',
                pathMatch: 'full'
            },
            {
                path: 'character-creation',
                component: CharacterCreationPageComponent,
                title: 'Creating a Character - Player Rules'
            },
            {
                path: 'species',
                component: SpeciesPageComponent,
                title: 'Species - Player Rules'
            },
            {
                path: 'character-origin',
                component: CharacterOriginPageComponent,
                title: 'Character Origin - Player Rules'
            },
            {
                path: 'classes',
                component: ClassesPageComponent,
                title: 'Classes - Player Rules'
            },
            {
                path: 'attributes-skills',
                component: AttributesSkillsPageComponent,
                title: 'Attributes and Skills - Player Rules'
            },
            {
                path: 'character-values',
                component: CharacterValuesPageComponent,
                title: 'Set Character Values - Player Rules'
            },
            {
                path: 'perks-abilities',
                component: PerksAbilitiesPageComponent,
                title: 'Perks and Abilities - Player Rules'
            },
            {
                path: 'finish-character',
                component: FinishCharacterPageComponent,
                title: 'Finish up your Character - Player Rules'
            },
            {
                path: 'equipment',
                component: EquipmentPageComponent,
                title: 'Equipment - Player Rules'
            },
            {
                path: 'party-origin',
                component: PartyOriginPageComponent,
                title: 'Optional: Party Origin - Player Rules'
            },
            {
                path: 'getting-stronger',
                component: GettingStrongerPageComponent,
                title: 'Getting Stronger - Player Rules'
            },
            {
                path: 'exhaustion-resting',
                component: ExhaustionRestingPageComponent,
                title: 'Exhaustion and Resting - Player Rules'
            },
            {
                path: 'casting-spells',
                component: SpellsPageComponent,
                title: 'Casting Spells - Player Rules'
            }
        ]
    },
    {
        path: 'rules',
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
