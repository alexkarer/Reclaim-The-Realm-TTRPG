# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reclaim the Realm (RTR) is a custom TTRPG system with four separate modules that share a central game data store. There is no root-level build system — each module is managed independently.

## Module Commands

Each module must be run from its own directory.

### rules-reference (port 4200)
```bash
cd rules-reference
npm start         # Dev server
npm run build     # Production build
npm test          # Karma/Jasmine tests
npm run copy:assets  # Copy icons from common_resources (run manually if icons are missing)
```

### npc-generator (port 4201)
```bash
cd npc-generator
npm start
npm run build
npm test
```

### travel-encounters (port 4202)
```bash
cd travel-encounters
npm start
npm run build
npm test
```

### foundry-vtt/reclaim-the-realm
```bash
cd foundry-vtt/reclaim-the-realm
npm run build          # Full build: TypeScript + SCSS + Foundry data packs
npm run build:ts       # TypeScript only
npm run build:css      # SCSS → CSS only
npm run build:pack     # Recompile all 11 Foundry data packs
npm run build:unpack   # Unpack packs to _source/ for editing
npm run watch          # Watch SCSS only
npm run createsymlink  # Create symlinks for local Foundry VTT testing
```

## Architecture

```
/
├── common_resources/     # Single source of truth for all game data (JSON)
├── rules-reference/      # Angular SPA — interactive rules documentation
├── npc-generator/        # Angular SPA — NPC creation wizard
├── travel-encounters/    # Angular SPA — travel/encounter generation
└── foundry-vtt/
    └── reclaim-the-realm/ # Foundry VTT system module (TS + SCSS)
```

### common_resources/

Contains all game data as JSON files. Key directories:
- `classes/` — class definitions and class abilities
- `spells/` — spell definitions
- `martial_maneuvers/` — combat abilities
- `hybrid_abilities/` — abilities mixing martial and spell
- `perks/` — character progression perks
- `equipment/` — weapons, armor, items
- `player_rules/` — attributes, skills, character creation
- `core_rules/` — base game mechanics
- `combat/` — combat mechanics
- `adventuring/` — travel and exploration rules
- `keywords.json` — game terminology
- `textkeys.json` — text key mappings

This is the authoritative data source. Both the Angular SPAs and the Foundry VTT module consume it.

### Angular SPAs (rules-reference, npc-generator, travel-encounters)

- Angular 19–21 depending on the app, with Bootstrap 5 + ng-bootstrap for UI
- Game data from `common_resources/` is imported directly into the app's `src/resources/` directory (via copy scripts or direct import)
- Each app is independent with its own `angular.json` and `package.json`
- `rules-reference` uses `npm run postinstall` / `npm run copy:assets` to copy icons from `common_resources/assets/` via `xcopy` (Windows)

### Foundry VTT Module

- Source TypeScript lives in `src/`, compiles to `module/`
- Entry point: `module/reclaim-the-realm.mjs`
- SCSS lives alongside modules and compiles to `css/`
- Game data packs: 11 Foundry VTT packs stored as `.db` files in `packs/`, with editable source in `packs/_source/`
- Always run `build:unpack` before editing pack data, and `build:pack` after
- Foundry type definitions are in `foundry/` (local, not from npm)
- See `foundry-vtt/README.md` for local testing setup via symlinks

## Data Flow

1. Game rules and content are defined in `common_resources/` JSON files
2. Angular apps read this data to render interactive rule references and generators
3. The Foundry VTT module independently implements the same rules as a playable system
4. Changes to game rules must be reflected in both the Angular apps and the Foundry module separately — there is no shared code layer, only shared data files

## Current Version

The project is in active v3 development. See `v3_changes.md` for the major redesign scope and `changelogs.md` for version history. Recent work has focused on spell mechanics and the Spells tab in the rules reference.
