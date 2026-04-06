# TODOs for RtR Version 3.

After the first ~10 Session of the RtR Playtest, big changes are incoming

## Things that work well

- Attributes are fine, also balance with skill points works good.
- Making most abilities also do something on fail is quite good, 
- Martial Damage rework seems OK
- Spell casting system also seems ok, it is a bit cumbersome - but they can't cast that many spells so it's ok.
- Fixed NPC rolls do make some stuff quite easy.
- The Ability strucutre/formatting implemented in FoundryVTT, clearly spelling out the Check and the results, sepeartly is good
- That everything is an ability should stay.
- Introducing tags didn'T come up much but very much makes sense
- I like how suprise works
- NPC compactness works quite well
- Deaths door is definitefly cool but there should be more tension with it
- I am happy with only 4 defensive values

## Things that don't work so well.

- Still too complicated.
- The system also Lacks also a bit of flavour.
- Too many Perks
- Still not happy with Hybrid Abilities
- Weapon choices are very boring
- A fate/Inspiration mechanic is missing very much.
- Movement is quite complicated for Players, but hopefully thats just a learning thing
- The spell disciplines felt quite akward especially since the manipulation feels a bit too much "like the rest"
- The requirements are not clearly visible, a skill tree would be better
- Did not get too test shields
- Alignemnt does not matter as much as I would maybe like
- Class techniques are kinda problematic for desinging as it is difficult to split between spells/martial maneuvers, and lots of redundant abilities.

## Progress Tracker

❌ -> when not yet done
ℹ️ -> considered but not done
✅ -> when done

### Character

- Add fate mechanic, potential options: reroll, gain extra 2 AP during turn, reduce damage (✅)
    - Potentially have a limit of fate that can be used per extended long rest (✅)
    - Non Spellcasting Characters should have more fate as they are less relient on the cosmic plane. (❌)
    - Warlock should not have any Fate at all but a substitude ability where they can essentially gate fate abilities/bonus by gaining corruption. (❌)

- Make Origin a bit more interactive, let the Players have a bit more agency or empower them to do something with it. (❌)
    - Each character should have a goal upon completion they get extra Fate (✅)
    - Try to get each living to 6 possibilities for more variance (❌)
    - for the party origin maybe make a goal? (❌)

- Try creating some sort of party/combo mechanic if possible or maybe general party upgrades like a synergy stat (❌)
    - maybe some combo abilities that gain benefits when used at the same time. (❌)

- Add complete Injury Table, with different Damage Type categories (❌)
    - Should only happen at Deaths Door or when Unconscious or recieving damage (✅)
    - at least 5 outcomes for each damage type (❌)


#### Species
- Create at least 3 more Species (❌)
    - Species from the Water Plane? Merfolk or Turtle Creature definitfly some kind of Amphibian creature
    - Species from the Fire Plane? Maybe some kind of Lizard creature
- Rework traits, should just be 1 thing and  be something way more unique (❌)

#### Skills
- Since skill perks are removed consider adding milestone benefits back (❌)
    - Should be no more than 2 per Skill (6/12) but only at the end and check if they are really needed
- Move Animal Handling into Nature (✅)
- Rework Lore skills and remove their distinction (✅)
    - possibly create riftlands skill (❌)
- Add rules for aiding others in skill tests (✅)
- remove all references to passive skills (✅)
- make sure links to all skills are there in the text (❌)

#### Classes

Remove class techniques as they make more provbelms as they solve and include abilities in martial maneuvers or spells (❌)
    - Some Abilities can also be accessed as part of Perks where it makes sense (❌)
    - In return Class Core Abilities have to be reworked to not be a resource for using abilities but something else (❌)

- Warlock: (❌)
  - Rework Corruption to work without Class Techniques (❌)
  - Mutations should have some visual or mental changes when the perk is taken, where a table is rolled everytime (❌)
    - Regeneration Mutation is a bit too strong (❌)
  - Corrutpion Limit should be changed a bit also with how it interacts with Mutations (❌)
  - Rework Warlock Perk Tree (❌)
  - Core Ability: (❌)
    + Stays corruption, basically a way to gain useful bonuses at the cost of gaining corruption
    + Corruption Limit with Mutations works the same, however should find etter way to word it.
- Priest: (❌)
 - Rework Tides of the Aether to work without Class Techniques (❌)
 - Simplify Aether Dice notation: AD(=) -> matching AD, AD(!) -> unique AD  (❌)
 - Think whether to change it to a more flavourful Faith mechanic, where when you perform/show faith you get Dice (❌)
 - Priest should also interact the most with the Fate mechanic. (❌)
 - Core Ability (❌)
    + Works similiar to now, perform beneficial actions to gain aether dice.
    + Abilities for use should interact with alignment
    + When meeting vertain amount of aether dice, potentially gain a minor passive buff.
 Rework Priest Perk Tree (❌)
- Barbarian (❌)
    - new maneuvers: Unspent Rage(When going unconcious can take a turn, costs lot of rage), (Reckless Abandon)  can'T dodge but gain bonuses
    - Think if Rage can be improved to be more flavourful without being too complicated. (❌)
    - Rework Barbarian Perk Tree (❌)
    - Core Ability (❌)
        + Gain Rage for similar to now
        + Can use it to reduce damage or increase melee/thrown damage.

- Possibly havbe every class have the same number of class skills per level (❌)
- Only have Class Perks and fold all other Perks in there and have Perks be part of Classes (❌)
- Every Class gains the same amount of base skill points (❌)
- See if perk point system needs to be kept (probably)  (❌)

### NPCs

- Tune down damage (❌)
- Create more templates too create interresting NPCs and have dedicated sub-types (❌)
- Boss NPC type, grants double XP, they gain a second turn before the end of the battle round. Also access to special boss abilities depending on their Level, but only 1 Boss can exist at the same time. (❌)
    - Second Life after dropping to 0 HP with then maybe to access to extra ability. (❌)
    - Spawning More Enemies each Round. (❌)
- More Interactive NPC Mechanics (❌)
    - CD, should start on cooldown and be visible to the players (❌)
    - Triggered Abilities that are reactions that happen on defined points and it is visible to players that a trigger exists (❌)

### Abilities

- add foundry icon to each ability in JSON (✅)
    - also find way to include icon in webpage (✅)
    - define icons at a single place in global resourecs and add npm step to copy it to other repos (❌)
    - also define colour for each ability and define it in JSON (✅)

- Ability amount should increase instead with 1 + LEVEL + (int/2) (❌)

- All abilities are now MARTIAL or SPELL Test (❌)

- Remove Hybrid Abilities for now (❌)
    - Should just be spells

- REwork abilities to use the clear formating from foundryVTT (✅)
    - For ongoing effects label Concentartion clearly and rework how mechanics are displayed (❌)
    - Add LOS Keyword to relevant abilites, add boolean field to ability

- Add Standard Abilties: (❌)
    - Evading Attacks (no AP) (❌)
    - rename environment interactions to: Interction - Quick and Interction - Regular

#### Martial Maneuvers (Techniques)

- rename Martial Maneuvers to Techniques as there are no more Class Techniques (❌)
- Incoperate all Weapon Maneuvers in Weapons (❌)
- More abilities that have non-combat users (❌)

- Abilities that have not been Kept for now and need a rework (❌)
    - Anticipate (❌)
    - Tag Team (❌)
    - Bodyguard (❌)
    - Cut of the Retreat (❌)

- Ensure all there are enough Maneuvers for next campaign (❌)
    - 4 basic for each type (❌)
    - 2 advanced for each type (❌)

Maneuver Ideas:
    - Catch/Deflect Missiles/Projectiles (❌)

#### Spells

- rename ARCANA to MANA, not ideal but better name (✅)

- Split up disciplines differently (✅)
    - Elemental (Pyrmoancy, Hydromancy, Aeromancy, Geomancy) should be unchanged, the incompability works quite well. Maybe certain elements should emphazise certain Attributes more. (✅)
    - Psychic(Telekinesis, Telepathy, Divintation), These are abilities that also manifest biologically in the brain, should emphasis INT (telekin), PER (divin) and CHA (telepath). (✅)
        - Add Biomancy to psychic as replacement for transmutation? (❌)
    - Light (Restoration, Holy), Only possible for good chars, mostly need SPI (✅)
    - Dark (Necromancy, Unholy), Only possible for evil chars, mostly need SPI (✅)
    - Arcane is a bit too akward and doesn't really fit in there:
        - THink if it is possible to remove it?  (❌)
            - Teleporation is akward but needed
            - Illusion is akward.
            - Conjuration as well.
        - Arcane (Teleporation, Conjuration, Illusion) there are ones that can be learned by most people, should mostly emphasize SPI and INT (✅)
            - Transmutation was remoced, check if it is actually needed.  (❌)
                + possible Transmutation Spell List:
                    * Enhance (Change physically to enhance differnt things: senses or body)
                    * Polymorph

- Also reuse basic (16), advanced (3), master (10), transcendet (25) for spell differential (❌)

- Add full Spell Failure (Magical Mishap) Table/Rework for new spell discipline (❌)
    - add at least the level 3 entities that can appear on failure (❌)

- Properly define Spell mechanics: (❌)
    - Concentration, works fine but define it (❌)
    - Charge X, similar to concentration has to spend X AP to cast the spell but it can be done over multiple turns and during it concentrate (❌)
    - Upcasting: define in the upcasting in the incremental mana cost required (❌)
    - Ritual: Mechanic that allows multiple people to cast the spell. (❌)

### Equipment

- Rebalance Weapons to have Maneuvers (✅)
    - More Maneuvers should be unlocked with Martial Level so spellcasters have not immediate access to them. (❌)
- Don't roll randomly for starting equipment, also figure out what good prices should be and starting gold/equipment (❌)

- maneuvrepenalty should only nerf dodge (✅)

- Add Staffs:
    - each staff has 1 ability that has charges with max charges that need arcana too charge (❌)
- Add Robes, they do not work while waring armour (❌)
    - Common starting robes, +1 to Spell cast test for the relevant spell discipline (❌)

- Instead of Rations just have a supplies count/item (✅)

- rework Shields (✅)

- re-evaluate set bonus (❌)
    - maybe let those items just be cosmetic at first (❌)

- Add a Trinket Table (❌)

- masterwork/higher tier should be separate items instead of just upgrades somewhere in rules (❌)
    - what to do with crude (❌)

- Overview changes (❌)
    - Add cost filter (numeric) for equipment overview (❌)
    - add tier filter (❌)

- Add missing Items: (❌)
    - Candle
    - Lantern
    - Spyglass
    - Ink and Pen
    - Paper/Parchment
    - Book with various variants
    - Ring
    - Everything from Goods and services that makes sense
    - Tea Leaves

Add various Loot Items (❌)
    - Various broad category that can represent loot from Monsters (e.g. Nature/Death/Hides, Tier should be equal to npc level)

Add Crafting Rules: (❌)
    - Extended Long Rest Activity: (❌)
        1. Start of Acitivity Choose Item which requires an amount of crafting points (a time unit) and materials and maybe additional special requirements, Additional requirement: relevant skill needs to at least equal item tier.
        2. Each Activiy Cycle a [D20 TEST] has to be made with Attribute + relevant Skill, the result yields a number of crafting points and maybe potentially reduce cost and/or additional benefits for the item.
        3. When enough crafting points have been accumulated the item is crafted
    - Simple Item crafting (❌)
        Tier 1 Items can be crafted within a single day.
    - Time Units should be based on Item Tier
        Base cost Item Tier = Time Units.

Magic Items:
    - various enchantments and bonuses whcih basically

### Combat Mechanics

- Try out different Initiative mechanics, mainly copy a version of the shadow of the demon lord system (❌)
    - essentially, monsters always go first, players can go first if they use a 1 AP Ability "Seize the Initiative" (❌)
    - also requires new reactions. Reactions now are regular Abilities that have a keyword. They can have any cost and only other reaction abilities can be used in response to a reaction ability (❌)
    - also requires all turn based ability to change so that they last until end of a round. (❌)
    - Also all Status Efffects trigger at the start of the round (❌).
    - Suprised Creatures: can't use Reaction Abilities and their AP is reduced by 1. Also can't use Seize the Initiative (❌)
- Rework Reactions, these are now special Abilities with a special Tag. (❌)
    - consider a character only being able to use one reaction at a time (i.e. if they are using a reaction and someone responds they can't use another reaction)  (❌)

- Remove cosmic damage type (❌)
- Deaths Door should have more tension (❌)
- Rework all circumstancial bonuses so it works with ther not being any attacks (only give DODGE bonus) (❌)
    - Only have 2 types of Cover small/large (❌)
    - rework concealment to work with new impl (potentially make a d100 roll)  (❌)
- Remove unneded stuff: high ground/low gound (❌) 
- You can wake up from unconcious during combat (❌) 

- Rework Status Effects so they work with changes to remove Attacks (❌)
    - remove reduntant status effect (❌)
    - clean up restrained text and make escape it's own ability (❌)
    - damage/heal status effects apply at the end of each ROUND (❌)
    - Check that status effects interact properly with the Evade Ability, e.g. Daze should still allow that reaction. (❌)
    
### Adventure Mechanics

- Are the climbing, swimming, fyling rules really necesarry? (❌)
- Remvoe that Falling stuff, just have the damage table remaining (❌)
- travel distance should be reworked to be simpler and work more with the travel mechanics below (❌)

- For Long Rests in dangerous area, generate a table that is communicated to the players for long rest dangers (❌)
    - should also include a non-combat or distrubt option, just maybe something went wrong

- Extended Long Rest should be 1 week minimum (✅)
    - one activity can be choosen each week (✅)
    - complications should be a thing (✅)
    - each table should have an outcome depending on a d20 test. (✅)
    - add possibilities for stuff to do which the players can pick and choose (❌)
        - crafting  (❌)
        - creating a work of art (❌)
        - research/study (❌)
        - community service (❌) 
        - spend time with loved ones (❌)
        - Work (Tool, Medicine or smth else) (❌)
        - go undercover (❌)
        - improve relations with faction (❌)
        - religous service (❌)
        - carousing (❌)
        - entertainment (❌)
        - medical servies that speed up healing (❌)
        - magical experiments (❌)

- Proper travel mechanic that includes the following: (❌)
    - One day Travel mechanic, should be similar to Delve from Heart (❌)
        - Only needed in the followign circumstances: Really dangerous environment, tracking something, running away from someting
        - Bad events can have consequences that they loose supplies
        - They have to achieve a number of success
        - Events that can happen 
        - Traveling can reduce stamina/hp depending on events 
        - Create proper table of what can happen (combat, sickness, ...)
        - XP are only rewarded for the travel day and nothing extra for combat
        - Create set Difficulty Levels
        - rules for aborting travel
        - should define how much distance was covered
    - Multi-day Travel, which should be more role-play like (❌)
        - Allow players too pick from Events that can happen or let them roll and they need to describe it.
            - Each Event is not a garantueed result, there can be multiple concluions
        - Additionally there is one event affecting the whole party, potentially different tables if they travel in a large group.
    - Riftlands Travel (❌)
        - see phone notes, essentially one-day travel mechanic on steriods
        - the difficulty relates to how deep you are inside the riftlands
        - enahnced random tables, also tables for random locations and civilizations genreator (how large, origin, how they treat strangers, ...)
        - arcana mishaps are more common here
        - specific locations are hard to get too and maybe need some sort of keys or instructions or clues with many smaller expeditions.
        - teleporation is special in riftlands

- Add various Loot Tables

### Other

- Of a lore and game perspective make sure to emphasis the need to grow powerful as the world is so hostile that everyone will otherwise perish (❌)
    - which also means that the individuals who get to powerful gain other flaws which stops them from saving the world (❌)

- Make items collapsable/hidden for easier navigation (❌)

- Rework keyword processor logic to use the new json (✅)
    - Clear up if TOUGHNESS TEST or SAVE should be used for keywords.

- when referencing abilities, have a small preview of the ability (❌)

- Cosmic Mutations should be fleshed out more. (❌)

- Move Player Character creation to separate page from Rules (✅)

- Allow more filter options for Abilities (❌)
    - Filter for Tags: Reaction, Attack, Move (✅)
    - add more tags: Heal? (✅)
    - Add sorting (✅)

- Remove initial page and keywords since ATTACK is getting removed (❌)
    - remove degree of success/failure part (❌)
    - mention that everything is an ability (❌)

- Create Chase Mechanic (❌)
    - should be very abstract but state distance in case needed
    - distance covered should be based on MP and all are added simultaneously at the end of the round. (in case of special movement maybe grant extra move)
    - should be round based and at the start a complication is rolled and at the end the movement is added and any chase reults are resolved.
    - There should be a set of actions that can be used during the round (tackle, imrpovise, ...)
    - after x rounds should cost stamina for players and if no stamina, either reduce speed or take exhaustion
    - there should be a win condition for the players after X rounds (maybe based on level of enemy)

- Clear TODO lists (❌)
 - Size should be moved away from player rules (❌)

- Fomratting changes (❌)
 - Check where Info and additional explainer boxes might be needed (❌)
 - add certain key values and formulas as a sidebar. (❌)
 - instead of range in meters use [FIELD] to designate ranges (❌)
 - add feature to reference Abilities directly (❌)
 - replace/add keywords with icons to make it more clear (HP: red heart, THP: blue heart, DR: shield)

- Verify all console errors are gone (❌)
