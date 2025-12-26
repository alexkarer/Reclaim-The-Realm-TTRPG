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
✅ -> when done

### Character

- Add fate mechanic, potential options: reroll, gain extra 2 AP during turn, reduce damage (✅)
    - Potentially have a limit of fate that can be used per extended long rest (✅)
    - Non Spellcasting Characters should have more fate as they are less relient on the cosmic plane. (❌)
    - Warlock should not have any Fate at all but a substitude ability where they can essentially gate fate abilities/bonus by gaining corruption. (❌)
- Make Origin a bit more interactive, let the Players have a bit more agency or empower them to do something with it. (❌)
    - Each character should have a goal upon completion they get extra Fate (✅)
- Try creating some sort of party/combo mechanic if possible or maybe general party upgrades like a synergy stat (❌)
    - maybe some combo abilities that gain benefits when used at the same time. (❌)
- Add complete Injury Table, with different Damage Type categories (❌)
    - Should only happen at Deaths Door, maybe need to continuesly count how much damage recieved and at the end of the round needs some injury test (❌)
    - Injury also should maybe instead be something that increases and accumulates with the last level being death (❌)

#### Species
- Create at least 3 more Species (❌)
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
- Priest: (❌)
 - Rework Tides of the Aether to work without Class Techniques (❌)
 - Simplify Aether Dice notation: AD(=) -> matching AD, AD(!) -> unique AD  (❌)
 - Think whether to change it to a more flavourful Faith mechanic, where when you perform/show faith you get Dice (❌)
 - Priest should also interact the most with the Fate mechanic. (❌)
 Rework Priest Perk Tree (❌)
- Barbarian (❌)
     Rework Rage to work without Class Techniques (❌)
    - new maneuvers: Unspent Rage(When going unconcious can take a turn, costs lot of rage), (Reckless Abandon)  can'T dodge but gain bonuses
    - Think if Rage can be improved to be more flavourful without being too complicated. (❌)
    - Rework Barbarian Perk Tree (❌)

- Possibly havbe every class have the same number of class skills per level (❌)
- Only have Class Perks and fold all other Perks in there and have Perks be part of Classes (❌)
- Every Class gains the same amount of base skill points (❌)
- See if perk point system needs to be kept (probably)  (❌)

### NPCs

- Tune down damage (❌)
- Create more templates too createinterresting NPCs and have dedicated sub-types (❌)
- Boss NPC type, grants double XP, they gain a second turn before the end of the battle round. Also access to special boss abilities depending on their Level, but only 1 Boss can exist at the same time. (❌)
    - Second Life after dropping to 0 HP with then maybe to access to extra ability. (❌)
    - Spawning More Enemies each Round. (❌)
- More Interactive NPC Mechanics (❌)
    - CD, should start on cooldown and be visible to the players (❌)
    - Triggered Abilities that are reactions that happen on defined points and it is visible to players that a trigger exists (❌)

### Abilities

- add foundry icon to each ability in JSON (✅)
    - also find way to include icon in webpage (✅)
    - also define colour for each ability and define it in JSON (❌)
- Ability amount should increase instead with 1 + LEVEL + (int/2) (❌)
- All abilities are now MARTIAL or SPELL Test (❌)
- Remove Hybrid Abilities for now (❌)
    - Should just be spells
- REwork abilities to use the clear formating from foundryVTT (❌)
    - For ongoing effects label Concentartion clearly and rework how mechanics are displayed (❌)
    - Each Ability should have their own crit effect.


#### Martial Maneuvers (Techniques)

- rename Martial Maneuvers to Techniques as there are no more Class Techniques (❌)
- Incoperate all Weapon MAneuvers in Weapons (❌)
- Rework Parry (❌)
    - maybe fine if part of a weapon
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

- Rebalance Weapons to have Maneuvers (❌)
    - More Maneuvers should be unlocked with Martial Level so spellcasters have not immediate access to them. 
- Don't roll randomly for starting equipment, also figure out what good prices should be and starting gold/equipment (❌)
- Medi-kit requires at least 3 Ranks in Medicine to use abilities (❌)
    - split up into multiple abilities that you can access at higher level.
- Shields should just give extra physical damage resistance (❌)
- Each Item should have listed what higher item tiers give you (❌)
- maneuvrepenalty should only nerf dodge (❌)
- Add Staffs: each staff has 1 ability that has charges with max charges that need arcana too charge (❌)
- Add Robes: that do cool stuff, worst case just +1 to spell cast test (❌)
- Instead of Rations just have a supplies count/item (❌)
- Add a Trinket Table (❌)

### Combat Mechanics

- Try out different Initiative mechanics, mainly copy a version of the shadow of the demon lord system (❌)
    - essentially, monsters always go first, players can go first if they use a 1 AP Ability "Seize the Initiative" (❌)
    - also requires new reactions. Reactions now are regular Abilities that have a keyword. They can have any cost and only other reaction abilities can be used in response to a reaction ability (❌)
    - also requires all turn based ability to change so that they last until end of a round. (❌)
    - Also all Status Efffects trigger at the start of the round (❌).
    - Suprised Creatures: can't use Reaction Abilities and their AP is reduced by 1. Also can't use Seize the Initiative (❌)
- Rework Reactions (❌), these are now special Abilities with a special Tag. (❌)
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

- Rework keyword processor logic to use the new json (✅)

- when referencing abilities, have a small preview of the ability (❌)

- Cosmic Mutations should maybe be fleshed out more. (❌)

- Move Player Character creation to separate page from Rules (✅)

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

- Fomratting cahnges (❌)
 - Check where Info and additional explainer boxes might be needed (❌)
 - add certain key values and formulas as a sidebar.