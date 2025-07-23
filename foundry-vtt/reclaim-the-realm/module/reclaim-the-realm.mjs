// Import document classes.
import { RtRActor } from './documents/actor.mjs';
import { RtRItem } from './documents/item.mjs';
// Import sheet classes.
import { RtRCharacterSheet } from './sheets/actor/character-sheet.mjs';
import { RtRNpcSheet } from './sheets/actor/npc-sheet.mjs';
import { RtRItemSheet } from './sheets/item/item-sheet.mjs';
// Import helper/utility classes and constants.
import { RTR } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';
import { generateFvttId } from "./utils.mjs";
import { getPrototypeTokenConfig } from "./helpers/actor-helper.mjs"

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

// Add key classes to the global scope so they can be more easily used
// by downstream developers
globalThis.RtR = {
  documents: {
    RtRActor,
    RtRItem,
  },
  applications: {
    RtRCharacterSheet,
    RtRNpcSheet,
    RtRItemSheet,
  },
  utils: {
    rollItemMacro,
  },
  models,
};

Hooks.once('init', function () {
  // Add custom constants for configuration.
  CONFIG.RTR = RTR;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + max(@attributes.agi.value, @attributes.per.value)',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = RtRActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.RtRCharacter,
    npc: models.RtRNPC,
  };
  CONFIG.Item.documentClass = RtRItem;
  CONFIG.Item.dataModels = {
    equipment: models.RtREquipment,
    perk: models.RtRPerk,
    ability: models.RtRAbility,
    classTechnique: models.RtRClassTechnique,
    spell: models.RtRSpell,
    martialManeuver: models.RtRMartialManeuver,
    species: models.RtRSpecies,
    class: models.RtRClass,
    npcAbility: models.RtRNpcAbility,
    npcTrait: models.RtRNpcTrait
  };

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;
  _configureStatusEffects();

  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet('core', foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet('reclaim-the-realm', RtRCharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: 'RTR.SheetLabels.Actor',
  });
  foundry.documents.collections.Actors.registerSheet('reclaim-the-realm', RtRNpcSheet, {
    types: ["npc"],
    makeDefault: true,
    label: 'RTR.SheetLabels.Actor',
  });

  foundry.documents.collections.Items.unregisterSheet('core', foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet('reclaim-the-realm', RtRItemSheet, {
    makeDefault: true,
    label: 'RTR.SheetLabels.Item',
  });

});

/* -------------------------------------------- */
/*  Init Hook Helpers                           */
/* -------------------------------------------- */

function _configureStatusEffects() {
  CONFIG.statusEffects = [];
  for (const [id, { ...data }] of Object.entries(CONFIG.RTR.statusEffects)) {
    let effect = foundry.utils.deepClone(data);
    effect.id = id;
    effect._id = generateFvttId(`RTR${id}`);
    CONFIG.statusEffects.push(effect);
  }
}

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

Handlebars.registerHelper('divideCeil', function (value, divider) {
  return Math.ceil(value / divider);
});

Handlebars.registerHelper('add', function (x, y) {
  return x + y;
});

Handlebars.registerHelper('subtract', function (x, y) {
  return x - y;
});

Handlebars.registerHelper('compare', function (x, y) {
  return x === y;
});

Handlebars.registerHelper('neq', function (x, y) {
  return x !== y;
});

Handlebars.registerHelper('not', function (x) {
  return !x;
});

Handlebars.registerHelper('and', function (x, y) {
  return x && y;
});

Handlebars.registerHelper('or', function (x, y) {
  return x || y;
});

Handlebars.registerHelper('exists', function (x) {
  return x !== undefined;
});


Handlebars.registerHelper('isOneOf5', function (match, arg1, arg2, arg3, arg4, arg5) {
  return match === arg1 || match === arg2 || match === arg3 || match === arg4 || match === arg5;
});

Handlebars.registerHelper('formatWeight', function (weightInGramm) {
  if (weightInGramm < 1000) {
    return weightInGramm + ' g';
  }
  let kg = Math.floor(weightInGramm / 1000);
  let gramm = weightInGramm % 1000;
  let dg = Math.floor((weightInGramm % 1000) / 100);
  let cg = weightInGramm % 100;
  if (gramm === 0) {
    return kg + ' kg';
  } else if (dg !== 0 && cg === 0) {
    return kg + '.' + dg + ' kg';
  } else {
    return kg + ' kg ' + gramm + ' g';
  }
});

Handlebars.registerHelper('formatCost', function (costInBc) {
  let bc = costInBc % 10;
  let sc = Math.floor((costInBc % 100) / 10);
  let gc = Math.floor(costInBc / 100);

  if (gc === 0 && sc === 0 && bc === 0) {
    return '-';
  } else if (gc === 0 && sc === 0 && bc !== 0) {
    return bc + ' bc';
  } else if (gc === 0 && sc !== 0 && bc === 0) {
    return sc + ' sc';
  } else if (gc === 0 && sc !== 0 && bc !== 0) {
    return sc + ' sc ' + bc + ' sc';
  } else if (gc !== 0 && sc === 0 && bc === 0) {
    return gc + ' gc';
  } else if (gc !== 0 && sc === 0 && bc !== 0) {
    return gc + ' gc ' + bc + ' bc';
  } else if (gc !== 0 && sc !== 0 && bc === 0) {
    return gc + ' gc ' + sc + ' sc';
  } else if (gc !== 0 && sc !== 0 && bc !== 0) {
    return gc + ' gc ' + sc + ' sc ' + bc + ' bc';
  }
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createDocMacro(data, slot));

  Hooks.on('combatTurnChange', (combat, prior, current) => {
    combat.combatant?.actor?.handleOnCombatTurnStart()
  });


  Hooks.on('createActor', async (actor, options, userId) => {
    // we check this in case the actor is imported from a compendium
    if (!actor.flags?.mySystem?.defaultsApplied) {
      const tokenDefaults = getPrototypeTokenConfig(actor.type);
      await actor.update({
        prototypeToken: tokenDefaults,
        'flags.mySystem.defaultsApplied': true
      });
    }
  });
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createDocMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.reclaimtherealm.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'reclaim-the-realm.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
