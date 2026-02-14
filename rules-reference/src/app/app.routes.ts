import { Routes } from '@angular/router';
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
import { EquipmentPageComponent } from './player-rules/pages/equipment-page/equipment-page.component';
import { PartyOriginPageComponent } from './player-rules/pages/party-origin-page/party-origin-page.component';
import { GettingStrongerPageComponent } from './player-rules/pages/getting-stronger-page/getting-stronger-page.component';
import { ExhaustionRestingPageComponent } from './player-rules/pages/exhaustion-resting-page/exhaustion-resting-page.component';
import { SpellsPageComponent } from './player-rules/pages/casting-spells-page/casting-spells-page.component';
import { RulesLayoutComponent } from './rules-reference/rules-layout/rules-layout.component';
import { IntroductionPageComponent } from './rules-reference/pages/introduction-page/introduction-page.component';
import { CoreGamePlayPageComponent } from './rules-reference/pages/core-gameplay-page/core-gameplay-page.component';
import { AdventuringPageComponent } from './rules-reference/pages/adventuring-page/adventuring-page.component';
import { TravelPageComponent } from './rules-reference/pages/travel-page/travel-page.component';
import { RiftlandsTravelPageComponent } from './rules-reference/pages/riftlands-travel-page/riftlands-travel-page.component';
import { AdventuringHazardsPageComponent } from './rules-reference/pages/adventuring-hazards-page/adventuring-hazards-page.component';
import { CombatPageComponent } from './rules-reference/pages/combat-page/combat-page.component';
import { CombatRoundPageComponent } from './rules-reference/pages/combat-round-page/combat-round-page.component';
import { StatusEffectsPageComponent } from './rules-reference/pages/status-effects-page/status-effects-page.component';
import { AppendixPageComponent } from './rules-reference/pages/appendix-page/appendix-page.component';
import { UsefulTablesPageComponent } from './rules-reference/pages/useful-tables-page/useful-tables-page.component';
import { ChaseRulesPageComponent } from './rules-reference/pages/chase-rules-page/chase-rules-page.component';
import { MovementPageComponent } from './rules-reference/pages/movement-page/movement-page.component';
import { AbilitiesPageComponent } from './rules-reference/pages/abilities/abilities-page.component';
import { TechniquesSearchComponent } from './techniques-search/techniques-search.component';
import { InjuriesDeathPageComponent } from './player-rules/pages/injuries-death-page/injuries-death-page.component';

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
                path: 'injuries-death',
                component: InjuriesDeathPageComponent,
                title: 'Injuries and Death - Player Rules'
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
        component: RulesLayoutComponent,
        title: 'Reclaim the Realm - Rules Reference',
        children: [
            {
                path: '',
                redirectTo: 'introduction',
                pathMatch: 'full'
            },
            {
                path: 'introduction',
                component: IntroductionPageComponent,
                title: 'Introduction - Rules Reference'
            },
            {
                path: 'core-gameplay',
                component: CoreGamePlayPageComponent,
                title: 'Core Gameplay - Rules Reference'
            },
            {
                path: 'adventuring',
                component: AdventuringPageComponent,
                title: 'Adventuring - Rules Reference'
            },
            {
                path: 'travel',
                component: TravelPageComponent,
                title: 'Travel - Rules Reference'
            },
            {
                path: 'riftlands-travel',
                component: RiftlandsTravelPageComponent,
                title: 'Riftlands Travel - Rules Reference'
            },
            {
                path: 'adventuring-hazards',
                component: AdventuringHazardsPageComponent,
                title: 'Adventuring Hazards - Rules Reference'
            },
            {
                path: 'combat',
                component: CombatPageComponent,
                title: 'Combat - Rules Reference'
            },
            {
                path: 'combat-round',
                component: CombatRoundPageComponent,
                title: 'Combat Round - Rules Reference'
            },
            {
                path: 'abilities',
                component: AbilitiesPageComponent,
                title: 'Abilities - Rules Reference'
            },
            {
                path: 'movement',
                component: MovementPageComponent,
                title: 'Movement - Rules Reference'
            },
            {
                path: 'status-effects',
                component: StatusEffectsPageComponent,
                title: 'Status Effects - Rules Reference'
            },
            {
                path: 'appendix',
                component: AppendixPageComponent,
                title: 'Appendix - Rules Reference'
            },
            {
                path: 'useful-tables',
                component: UsefulTablesPageComponent,
                title: 'A: Useful Tables - Rules Reference'
            },
            {
                path: 'chase-rules',
                component: ChaseRulesPageComponent,
                title: 'B: Chase Rules - Rules Reference'
            }
        ]
    },
    {
        path: 'classes',
        component: ClassesOverviewComponent,
        title: 'Reclaim the Realm - Classes'
    },
    {
        path: 'techniques',
        component: TechniquesSearchComponent,
        title: 'Reclaim the Realm - Techniques'
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
