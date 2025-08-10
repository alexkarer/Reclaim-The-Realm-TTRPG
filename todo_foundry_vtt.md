### Immidiate TODOS

Before Ability Actions, data needs to be cleaned up in the Abilities (also do perks immediatly as well)
- Requirements and Usage Cost of Class Techniques and Core Abilities still need to be proper set
- Usage Cost also missing for Martial Maneuvers
- For Usage Cost, Aether Dice are still a bit wonky, maybe save different types as individual entires.

Implement the Ability Actions:
  - Look should be improved a bit
    - Add Icons (Status Effects, for attacks/spell Tests)
  - Make Spell Cast Test bwefore using spell
  - TODO how to do crits
  - functionality for maneuver push or upcast missing
  - Figure out how to do more than 1 action
  - then in the chatmessage of the first action there should be continue buttons to go to the next action.
  - Ability Actions can maybe be displayed in a nice way in the actor sheet
  - In character overview, able to manually roll damage (execute results)
  - allow bonuses in ability (e.g. damage and attack bonuses)
  - also crit reduction or smth
  - properly translate attack results
  . allow temp HP healing

After ACtions are Implemented:
  - Add remaining spells

Check TODOS are all resolved

# General TODOs/Nice to have

## Bugs:

- Somehow Short rest button is triggered via ENTER Key

## Actors

- Handle Cearture Size
  - ALso increase Tokens and stuff

- Change Biography to either be in separate Tab or at the bottom of the Overview.
  - alignmeent should be there
  - languages should be there
  - background should be there
  - In the place of biography in the overview there should be class and species
- On all places show the formula for calculating, which is fixed but can be modified with additional values.
- Data Section add Translation 
- Add Notifications if there is something todo (e.g. learn new ability, add attribute pooitns, assign skill ranks)

- have UI that shows current AP and MP at start of Round and if a reaction is availible.
  - Also when using abilities reduce current AP
  - reference impl: https://github.com/BragginRites/bg3-inspired-hotbar/tree/main
    or https://github.com/ironmonk108/hotbar-expansion/blob/main/hotbar-expansion.js

- Add Icons to skill
- Add functionality for cover and concealment
- Add nicer way of displaying the resitances with icons and stuff

### Characters

- easy way to record character origin
- place for permanent injury
- passive Awareness and stuff (also handle distracted status effect)
- concealment bonuzses

- Save Learned Spell Disciplines and Martial Maneuver Types somewhere.

- Equipment changes:
  - Easy way to add/substract currency
  - way to "equip" items "rpg style"

- Implement Exhaustion in a nicer way
- Implement Errors in case too many Abilities or Perks are added.
- Perk Trees

- Show how values are calculated and if they are reduced in any way.
  
- When making SKill Test, a Request Help Button
  - Included in the chat message of the skill test, where all players are then asked if they want to contribute

### Summons

Separate Type that is bascically like NPCS but roll everything

### NPCS

- Overview Tab: change from bonus in save to passive values
- Description Tab: HTML Field that shows lore and stuff
- Implement Archetypes.

## Items

- Add color depending on type and subtypes (e.g. pyromancy spells red, martial perks red, spell perks blue, etc.)

### Equipment

- Show encumbermance in equipment and calculate
- Automatically update character based on items
- Create Functionality to "equip" items.
- Can embedd abilities that show up in the character sheet
  - Also functionality that ability consumes item and reduces qty, and if qty 0 then ability shows up as disabled

###  Abilities

- add possiblity to properly modify cost, tags, requirements
- Automatic checking of requirements
- Allow for adding custom actions
    - Attack, Martial Test, Spell Test, ...
    - Damage
    - Applying Effects
    - also custom bonuses should can be added in each step (attack bonus, martial damage bonus)

- Maybe Custom Actions work like this: Offensive thingy (attack, martial test or spell test).
  - Then define what happens on success.
  - also define what happens on failure.
  
Allow Macro (Hotbar) usage of abilities

Extend Spell Cast functionality to support upcasting.

Hide certain abilities that can't be used (example, silennced)

Add posiblity to add additional condition types for action result (e.g. target creature type)

### Perks

- Interactive Perk Tree
- Proper Requirements Checking
- also check if there are enough Perks points

### Tables

- Injury Table
- Spell Misshap Table

### Classes

- Actually Implement Character Classes
- Handle choices on Combat start, example: elemental barbarian, mystic cleric 

## Interactions

- Damage Roll functionality
- Implement all remaining Status Effects
- Implement Conditions: Prone, Flanked, Climbing
- Status Effects should time out.

## Special

Have a UI that shows Action Points and MP at the bottom similar to Divinity or something similar.
  https://foundryvtt.com/api/classes/foundry.applications.ui.Hotbar.html

Have sound and visual effects for status effects 
Keep Records, total damage, healing, etc. (check fantasygrounds example)
Use JSOn common_resources

# Minor Desired Changes

- Don't make Attribute Names Clickable in NPC Data Section (currently dont do anything)
- Translate Everything including warnings and such
- Use Foundry Notifications instead of console statements where reasonable
- Do not duplicate getEmbeddedDocument Function in CharacterSheet Class