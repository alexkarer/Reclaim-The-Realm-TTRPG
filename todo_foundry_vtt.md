### Immidiate TODOS

Status Effects are actually a big pain in the Ass damit.
Define Prototype Tokens in the Data for each Actor
reset thp after long rest
add LEVEL to short rest HP recovery (also change rules)

add specific roll tests (d20Test, ATtributeTest, ...) in actor class

# General TODOs/Nice to have

## Bugs:

- Somehow Short rest button is triggered via ENTER Key

## Actors

- Change Biography to either be in separate Tab or at the bottom of the Overview.
  - alignmeent should be there
  - languages should be there
- On all places show the formula for calculating, which is fixed but can be modified with additional values.
- Configure prototype token
- Data Section add Translation 
- Add Notifications if there is something todo (e.g. learn new ability, add attribute pooitns, assign skill ranks)

- have UI that shows current AP and MP at start of Round.

- Handle Cearture Size
- Add Icons to skill

### Characters

- easy way to record character origin
- place for permanent injury
- passive Awareness and stuff
- concealment bonuzses
- Implement Exhaustion in a nicer way
- Implement Errors in case too many Abilities or Perks are added.
- Perk Trees

### Summons

Separate Type that is bascically like NPCS but roll everything

### NPCS

- Overview Tab: change from bonus in save to passive values
- Description Tab: HTML Field that shows lore and stuff
- Skills: needs possibility to set skil lranks manaullys


## Items

- Add color depending on type and subtypes (e.g. pyromancy spells red, martial perks red, spell perks blue, etc.)

### Equipment

- Show encumbermance in equipment and calculate
- Automatically update character based on items
- Create Functionality to "equip" items.
- Can embedd abilities that show up in the character sheet

###  Abilities

- Add better Data structure for Cost and Tags
- add possiblity to properly modify cost, tags, requirements
- Automatic checking of requirements
- Allow for adding actions
    - Custom Dice Roll
    - Custom Roll (Damage)
    - Applying Effects

- Maybe Custom Actions work like this: Offensive thingy (attack, martial test or spell test).
  - Then define what happens on success.
  - also define what happens on failure.


Extend Spell Cast functionality to support upcasting.

### Perks

- Interactive Perk Tree
- Proper Requirements Checking

### Tables

- Injury Table
- Spell Misshap Table

### Classes

- Actually Implement Character Classes

## Interactions

- Damage Roll functionality
- Implement all remaining Status Effects
- Implement Conditions: Prone, Flanked, Climbing
- Status Effects should time out.

- When making SKill Test, a Request Help Button

## Special

Keep Records, total damage, healing, etc. (check fantasygrounds example)
Use JSOn common_resources

# Minor Desired Changes

- Don't make Attribute Names Clickable in NPC Data Section (currently dont do anything)
- Translate Everything including warnings and such
- Use Foundry Notifications instead of console statements where reasonable
- Do not duplicate getEmbeddedDocument Function in CharacterSheet Class