____________________________________________________________
### Things to evaluate after Playtest:

**Big Things**
- consider moving attack back to the DM.
- add fate points / some mechanics to reroll things
- does spell casting system work
- The System should be focused around the Riftlands
  - Maybe also about accumilating power which can only be found in the riftlands and most "adventurers" get lost there
  - Find good inworld name for adventurer (rift explorers, nah sounds shit.).
  - Think of a way that makes the Riftlands work
  - It should be special and if you want to get to a specific Location it requires something special.
  - remove stamina cost from travel or rework it.

rewrok injury table to have 1d4 instead of 2d3
Will eventually add perk to heal

**Minor Things**
- improve layout of character creation 
- maybe make seperate pages for the individual headers
- adjust equipment item tier
- Add Wands and Staffs that enable spell basic attacks
- Robes?
- rename class names to be more inline with the world?
- rework origin to be more inline with in universe (consider riftlands)
- add toolbox as json
____________________________________________________________
### Planned changes after Playtest:

**Formatting**

**Bigger Mechanical Changes**
- Implement similar system for Spell Damage maybe ish
- add mental damage table

**Smaller Mechanical Changes**
- Spell Keywords need to be reworked
- Rewrite perks that have poor ability rendering/formatting

**Ability Simplifications**

**Character Changes**
- Maybe more attribute points per level
  - trying out 2 per level and starting with 8
  - need to change text
- For orgin, the cosmic start should include mutations

**Class Changes**
- Barbarian:
  - rename class path perks to fit with others
  - add perk that allows regeneration
- Mage, rework the way spell keywords interact with core ability
- Fighter:
  - complete rework of core ability
  - Maybe fighter only has a focus target (oath of moment style) ability and all class techniques are based of that Or maybe fighter can select different stances: Horde Breaker, Beast slayer, Tank and your class techniques change depending on that, you gain Focus 1 per Round and your stance changes how much you gain additionally.****
- Rogue:
  - complete rework of core ability

**Specific Changes**
- move Cosmic Mutations to json files and finish them.
___________________________________________________________
### Future Ideas / Nice to have:

maybe add shocked Status effect: can't use reactions

convert custom textelements thingy to rich text format https://github.com/contentful/rich-text

add activities that can be done during long rests:
- crafting
- research
- community service
- spend time with loved ones
- Work (Tool, Medicine or smth else)
- go undercover
- improve relations with faction
- religous service
- carousing
- entertainment
- medical servies that speed up healing.s

Massive Injuries should be split into mental and physical, additionally there should be maybe 3 damage type specific tiers.
rule for helping othrs, roll same check, for every 5 above 10 gain +1.
Table for when NPCs drop to 0 [HP] to determine what happens to them.
New keyword: [SAVE LOWERS], status effect gains 1 tier lower.

There should be a move resist stat that deterimes how much less you are moved.
- Tiny: 3x
- Small 2x
- medium 1x
- Large 1/2
- Huge 1/3
- Gargantuan 1/4
- Titanic 1/5s

add faction relations thing (is it relevant for this game?): 
- should be adventure specific
- higher should give you like access to items and other benefits

**Feat/Accomplishments**
Differnt way of gaining new abilities or features, the players can pick one and have to track progress until they got it, make it integratable into the riftlands and they should be achievable mostly by going to the riftlands.


**Perks**
- Martial Perks for each weapon

**Character Creation Builder**
- need a character wizard

**Missing/partially done things**
- Finish out Adventure Sections
- flesh out magical misshap table
- add missing spellcasting perk stuff
- add missing keyword descritpions
- proper phrasing of some stuff in the combat

**Equipment**
- other useful items, books that give bonuses to lore checks (treats skill as 1 rank higher, can only be affected by [INT]/3 amount of books at the same time, no skill twice)
- magic item rules
- crafting rules
- cooking items
- masterwork: also +1 damage.
- There should be a trinkets table.

**Spells**
- more spells
- finish out the spell discipline specific effects.
- Spell to remove curses and riftlands mutatioons

**Status Effects:**
- Confused Condition?

**Nice to have**
- have colored abilities and more icons
- add missing abilities
- add linking and tooltips for abilities

**Tollbox Things to Add**
- Chase!
  - See Phone Notes
- low character count combat.
  - Basically Initiative starts as Usual but that just determines who gets turn priority.
  - [MP] can only be used if gained through ability like Dash
  - Initiative is based upon [EAP] used during the combat (Effective AP).
  - The combatant with lowest [EAP] gets to go first, on tie is decided based upon turn priority.
  - The EAP you get depend on AP used and maximum AP: 3 AP = AP used * 10, 4 AP = AP used * 15, 5 AP = AP used * 12, 6 AP = AP used * 10
    - For creatures with more AP it gets a bit wonky
    - If getting AP through abilities, just reduce current EAP by (AP gained) * 10, If you increase your base AP each TURN, instead reduce every 60 [EAP]
    - 10 EAP is 1 second
    - IF AP are reduced, EAP are added instead.
  - Not recommended if more than 3 combatants are involved