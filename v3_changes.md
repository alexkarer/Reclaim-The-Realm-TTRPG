# TODOs for RtR Version 3.

After the first ~10 Session of the RtR Playtest, big changes are incoming

## Things that work well

- Attributes are fine, also balance with skill points works good.
- Making most abilities also do something on fail is quite good, 
- Martial Damage rework seems OK
- Spell casting system also seems ok, it is a bit cumbersome - but they can't cast that many spells so it's ok.
- Fixed NPC rolls do make some stuff quite easy.
- Split of Class Techniques/Martial Maneuvers/Spells is quite good.
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

## Progress Tracker

❌ -> when not yet done
✅ -> when done

### Character

- Add fate mechanic, potential options: reroll, gain extra 2 AP during turn, reduce damage (❌)
    - Potentially have a limit of fate that can be used per extended long rest
- Make Origin a bit more interactive, let the Players have a bit more agency or empower them to do something with it. (❌)
    - Each character should have a goal upon completion they get extra Fate (❌)
- Try creating some sort of party/combo mechanic if possible or maybe general party upgrades like a synergy stat (❌)
- Add complete Injury Table, with different Damage Type categories (❌)
    - Should only happen at Deaths Door

#### Species
- Create at least 3 more Species (❌)
- Rework traits, should just be 1 thing and  be something way more unique (❌)

#### Skills
- Since skill perks are removed consider adding milestone benefits back (❌)
    - Should be no more than 2 per Skill (6/12) but only at the end and check if they are really needed
- Move Animal Handling into Nature (✅)
- Rework Lore skills and remove their distinction (❌)
    - possibly create riftlands skill 
- Add rules for aiding others in skill tests (✅)
- remove all references to passive skills (❌)
- make sure links to all skills are there in the text (❌)

#### Classes

- Warlock: (❌)
  - Mutations should have some visual or mental changes when the perk is taken, where a table is rolled everytime (❌)
  - Corrutpion Limit should be changed a bit also with how it interacts with Mutations (❌)
- Priest: (❌)
 - Simplify Aether Dice notation: AD(=) -> matching AD, AD(!) -> unique AD  (❌)
 - Think whether to change it to a more flavourful Faith mechanic, where when you perform/show faith you get Dice (❌)

- Barbarian (❌)
    - new maneuvers: Unspent Rage(When going unconcious can take a turn, costs lot of rage), (Reckless Abandon)  can'T dodge but gain bonuses
    - Think if Rage can be improved to be more flavourful without being too complicated. (❌)

- Only have Class Perks and fold all other Perks in there and have Perks be part of Classes (❌)
- Every Class gains the same amount of base skill points (❌)
- Remove Perk point system, instead you get maybe 3 Perks at first level  (❌)
- Only have class Perks (❌)
    - Rework Barbarian Perk Tree (❌)
    - Rework Priest Perk Tree (❌)
    - Rework Warlock Perk Tree (❌)
        check phone todos
        - Regeneration Mutation is a bit too strong (❌)

### NPCs

- Tune down damage (❌)
- Create more templates too createinterresting NPCs and have dedicated sub-types (❌)
- More Interactive NPC Mechanics (❌)
    - CD is nice but there should be more

### Abilities

- add foundry icon to each ability in JSON (❌)
- Ability amount should increase instead with 1 + LEVEL + (int/2) (❌)
- All abilities are now MARTIAL or SPELL Test (❌)
- Remove Hybrid Abilities for now (❌)
    - Should just be spells
- REwork abilities to use the clear formating from foundryVTT (❌)
    - For ongoing effects label Concentartion clearly and rework how mechanics are displayed (❌)
    - Each Ability should have their own crit effect.


#### Martial Maneuvers

- Incoperate all Weapon MAneuvers in Weapons (❌)
- Rework Parry (❌)
- More abilities that have non-combat users (❌)

#### Spells

- Split up disciplines differently (❌)
    - Elemental (Pyrmoancy, Hydromancy, Aeromancy, Geomancy) should be unchanged, the incompability works quite well. Maybe certain elements should emphazise certain Attributes more. (❌)
    - Psychic(Telekinesis, Telepathy, Divintation), These are abilities that also manifest biologically in the brain, should emphasis INT (telekin), PER (divin) and CHA (telepath). (❌)
    - Light (Restoration, Holy), Only possible for good chars, mostly need SPI (❌)
    - Dark (Necromancy, Shadow), Only possible for evil chars, mostly need SPI (❌)
    - Arcane (Transmutation, Teleporation, Conjuration, Illusion) there are ones that can be learned by most people, should mostly emphasize SPI and INT (❌)
- Create Level requirement for spells and give them names (4,8,12) (❌)
- Add full Arcane Mishap Table/Rework for new spell discipline (❌)

### Equipment

- Don't roll randomly for starting equipment, also figure out what good prices should be and starting gold/equipment (❌)
- Medi-kit requires at least 3 Ranks in Medicine to use abilities (❌)
- Shields should just give extra physical damage resistance (❌)
- Each Item should have listed what higher item tiers give you (❌)
- maneuvrepenalty should only nerf dodge (❌)
- Add Staffs: each staff has 1 ability that has charges with max charges that need arcana too charge (❌)
- Add Robes: that do cool stuff, worst case just +1 to spell cast test (❌)
- Instead of Rations just have a supplies count/item (❌)
- Add a Trinket Table (❌)

### Combat Mechanics

- Try out different Initiative mechanics, mainly copy a version of the shadow of the demon lord system (❌)
    - essentially, monsters always go first, players after unless they use a special reaction (❌)
    - also requires new reactions. (❌)
    - also requires all turn based ability to change so that they last until end of a round. (❌)
- Remove cosmic damage type (❌)
- Deaths Door should have more tension (❌)
- Rework all circumstancial bonuses so it works with ther not being any attacks (only give DODGE bonus) (❌)
    - Only have 2 types of Cover small/large (❌)
    - rework concealment to work with new impl (potentially make a d100 roll)  (❌)
- Remove unneded stuff: high ground/low gound (❌) 
- You can wake up from unconcious during combat (❌) 

- Rework Status Effects so they work with changes to remove Attacks (❌)
    - remove reduntant status effect

### Adventure Mechanics

- Are the climbing, swimming, fyling rules really necesarry? (❌)
- Remvoe that Falling stuff, just have the damage table remaining (❌)
- travel distance should be reworked to be simpler and work more with the travel mechanics below (❌)

- For Long Rests in dangerous area, generate a table that is communicated to the players for long rest dangers (❌)
    - should also include a non-combat or distrubt option, just maybe something went wrong
- Extended Long Rest should be 1 week minimum (❌)
    - add possibilities for stuff to do which the players can pick and choose (❌)

- Proper travel mechanic that includes the following: (❌)
    - One day Travel mechanic, should be similar to Delve from Heart (❌)
        - Only needed in the followign circumstances: Really dangerous environment, tracking something, running away from someting
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

### Other

- Of a lore and game perspective make sure to emphasis the need to grow powerful as the world is so hostile that everyone will otherwise perish (❌)
    - which also means that the individuals who get to powerful gain other flaws which stops them from saving the world (❌)
- Make items collapsable/hidden for easier navigation (❌)
- Rework keyword processor logic to use the new json (❌)
- when referencing abilities, have a small preview of the ability (❌)
- Cosmic Mutations should maybe be fleshed out more. (❌)
- Move Player Character creation to separate page from Rules (❌)
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
