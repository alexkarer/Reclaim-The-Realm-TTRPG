export const RTR = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
RTR.attributes = {
  str: 'RTR.Attribute.Str.long',
  agi: 'RTR.Attribute.Agi.long',
  con: 'RTR.Attribute.Con.long',
  int: 'RTR.Attribute.Int.long',
  spi: 'RTR.Attribute.Spi.long',
  per: 'RTR.Attribute.Per.long',
  cha: 'RTR.Attribute.Cha.long',
};

RTR.attributeAbbreviations = {
  str: 'RTR.Attribute.Str.abbr',
  agi: 'RTR.Attribute.Agi.abbr',
  con: 'RTR.Attribute.Con.abbr',
  int: 'RTR.Attribute.Int.abbr',
  spi: 'RTR.Attribute.Spi.abbr',
  per: 'RTR.Attribute.Per.abbr',
  cha: 'RTR.Attribute.Cha.abbr',
};

RTR.skills = {
  animalHandling:  'RTR.Skills.AnimalHandling.name',
  athletics:       'RTR.Skills.Athletics.name',
  deception:       'RTR.Skills.Deception.name',
  investigation:   'RTR.Skills.Investigation.name',
  intimidation:    'RTR.Skills.Intimidation.name',
  medicine:        'RTR.Skills.Medicine.name',
  persuasion:      'RTR.Skills.Persuasion.name',
  awareness:       'RTR.Skills.Awareness.name',
  stealth:         'RTR.Skills.Stealth.name',
  survival:        'RTR.Skills.Survival.name',
  thievery:        'RTR.Skills.Thievery.name',

  culture:         'RTR.Skills.Culture.name',
  geography:       'RTR.Skills.Geography.name',
  elements:        'RTR.Skills.Elements.name',
  nature:          'RTR.Skills.Nature.name',
  supernatural:    'RTR.Skills.Supernatural.name',

  smithTools:      'RTR.Skills.SmithTools.name',
  alchemyKit:      'RTR.Skills.AlchemyKit.name',
  jewellersTools:  'RTR.Skills.JewellersTools.name',
  tailorsSet:      'RTR.Skills.TailorsSet.name',
  carpentersTools: 'RTR.Skills.CarpentersTools.name',
};

RTR.equipmentTypes = {
  weapon: "RTR.EquipmentTypes.Weapon",
  ammunitions: "RTR.EquipmentTypes.Ammunitions",
  armour: "RTR.EquipmentTypes.Armour",
  shields: "RTR.EquipmentTypes.Shields",
  wearables: "RTR.EquipmentTypes.Wearables",
  consumables: "RTR.EquipmentTypes.Consumables",
  toolsAndGadgets: "RTR.EquipmentTypes.ToolsAndGadgets",
  survival: "RTR.EquipmentTypes.Survival",
  commodity: "RTR.EquipmentTypes.Commodity"
}

RTR.damageTypes = {
  Physical: "RTR.DamageTypes.Physical",
  Fire: "RTR.DamageTypes.Fire",
  Frost: "RTR.DamageTypes.Frost",
  Corrosive: "RTR.DamageTypes.Corrosive",
  Sonic: "RTR.DamageTypes.Sonic",
  Electric: "RTR.DamageTypes.Electric",
  Poison: "RTR.DamageTypes.Poison",
  Psychic: "RTR.DamageTypes.Psychic",
  Cosmic: "RTR.DamageTypes.Cosmic",
  Holy: "RTR.DamageTypes.Holy",
  Unholy: "RTR.DamageTypes.Unholy"
}

RTR.classResources = {
  rage: "RTR.ClassResources.Rage",
  corruption: "RTR.ClassResources.Corruption",
  aetherDice: "RTR.ClassResources.AetherDice"
}

RTR.spellDisciplines = {
  elemental: "RTR.SpellDisciplines.Elemental",
  pyromancy: "RTR.SpellDisciplines.Pyrmoancy",
  hydromancy: "RTR.SpellDisciplines.Hydromancy",
  aeromancy: "RTR.SpellDisciplines.Aeromancy",
  geomancy: "RTR.SpellDisciplines.Geomancy",
  cosmic: "RTR.SpellDisciplines.Cosmic",
  light: "RTR.SpellDisciplines.Light",
  restoration: "RTR.SpellDisciplines.Restoration",
  necromancy: "RTR.SpellDisciplines.Necromancy",
  shadow: "RTR.SpellDisciplines.Shadow",
  divination: "RTR.SpellDisciplines.Divination",
  manipulation: "RTR.SpellDisciplines.Manipulation",
  telekinesis: "RTR.SpellDisciplines.Telekinesis",
  transmutation: "RTR.SpellDisciplines.Transmutation",
  conjuration: "RTR.SpellDisciplines.Conjuration",
  illusion: "RTR.SpellDisciplines.Illusion",
  teleportation: "RTR.SpellDisciplines.Teleportation",
  telepathy: "RTR.SpellDisciplines.Telepathy"
}

RTR.martialManeuverTypes = {
  agile: "RTR.MartialManeuverTypes.Agile",
  brawl: "RTR.MartialManeuverTypes.Brawl",
  fortitude: "RTR.MartialManeuverTypes.Fortitude",
  leader: "RTR.MartialManeuverTypes.Leader",
  tactical: "RTR.MartialManeuverTypes.Tactical",
  weapon: "RTR.MartialManeuverTypes.Weapon"
}

RTR.abilityDurationTypes = {
  instant: "RTR.AbilityDurationTypes.Instant",
  round: "RTR.AbilityDurationTypes.Round",
  minute: "RTR.AbilityDurationTypes.Minute",
  hour: "RTR.AbilityDurationTypes.Hour",
}

RTR.statusEffects = {
  // needed for foundry to mark combatants as defeated
  dead: {
    name: "Dead",
    img: "/icons/svg/skull.svg",
    description: "Dead",
    summary: "Dead"
  },
  
  // Circumstancal Bonuses
  prone: {
    name: "RTR.CircumstancalBonuses.Prone.label",
    img: "/systems/reclaim-the-realm/assets/icons/abilities/falling.svg",
    description: "RTR.CircumstancalBonuses.Prone.description",
    summary: "RTR.CircumstancalBonuses.Prone.description"
  },
  flanked: {
    name: "RTR.CircumstancalBonuses.Flanked.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/encirclement.svg",
    description: "RTR.CircumstancalBonuses.Flanked.description",
    summary: "RTR.CircumstancalBonuses.Flanked.description"
  },

  // Tier I Detremental Status Effects
  stunned1: {
    name: "RTR.StatusEffects.Stunned1.label",
    img: "/icons/svg/daze.svg",
    description: "RTR.StatusEffects.Stunned1.description",
    summary: "RTR.StatusEffects.Stunned1.summary",
    changes: [
      { key: "system.ap", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "-1", priority: 10 }
    ]
  },
  frightened1: {
    name: "RTR.StatusEffects.Frightened1.label",
    img: "/icons/svg/terror.svg",
    description: "RTR.StatusEffects.Frightened1.description",
    summary: "RTR.StatusEffects.Frightened1.summary"
  },
  burning1: {
    name: "RTR.StatusEffects.Burning1.label",
    img: "/icons/svg/fire.svg",
    description: "RTR.StatusEffects.Burning1.description",
    summary: "RTR.StatusEffects.Burning1.summary"
  },
  bleeding1: {
    name: "RTR.StatusEffects.Bleeding1.label",
    img: "/icons/svg/blood.svg",
    description: "RTR.StatusEffects.Bleeding1.description",
    summary: "RTR.StatusEffects.Bleeding1.summary"
  },
  poison1: {
    name: "RTR.StatusEffects.Poison1.label",
    img: "/icons/svg/poison.svg",
    description: "RTR.StatusEffects.Poison1.description",
    summary: "RTR.StatusEffects.Poison1.summary"
  },
  charmed1: {
    name: "RTR.StatusEffects.Charmed1.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/charm.svg",
    description: "RTR.StatusEffects.Charmed1.description",
    summary: "RTR.StatusEffects.Charmed1.summary"
  },
  crippled1: {
    name: "RTR.StatusEffects.Crippled1.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/broken-bone.svg",
    description: "RTR.StatusEffects.Crippled1.description",
    summary: "RTR.StatusEffects.Crippled1.summary",
    changes: [
      { key: "system.mp", mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE, value: "2", priority: 50 }
    ]
  },
  cursed1: {
    name: "RTR.StatusEffects.Cursed1.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/pentacle.svg",
    description: "RTR.StatusEffects.Cursed1.description",
    summary: "RTR.StatusEffects.Cursed1.summary"
  },
  weakened1: {
    name: "RTR.StatusEffects.Weakened1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Weakened1.description",
    summary: "RTR.StatusEffects.Weakened1.summary"
  },
  vulnurable1: {
    name: "RTR.StatusEffects.Vulnurable1.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/armor-downgrade.svg",
    description: "RTR.StatusEffects.Vulnurable1.description",
    summary: "RTR.StatusEffects.Vulnurable1.summary"
  },
  restrained1: {
    name: "RTR.StatusEffects.Restrained1.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/handcuffs.svg",
    description: "RTR.StatusEffects.Restrained1.description",
    summary: "RTR.StatusEffects.Restrained1.summary"
  },
  silenced: {
    name: "RTR.StatusEffects.Silenced.label",
    img: "/icons/svg/silenced.svg",
    description: "RTR.StatusEffects.Silenced.description",
    summary: "RTR.StatusEffects.Silenced.summary"
  },
  deafened1: {
    name: "RTR.StatusEffects.Deafened1.label",
    img: "/icons/svg/deaf.svg",
    description: "RTR.StatusEffects.Deafened1.description",
    summary: "RTR.StatusEffects.Deafened1.summary"
  },
  intoxicated: {
    name: "RTR.StatusEffects.Intoxicated.label",
    img: "/icons/svg/tankard.svg",
    description: "RTR.StatusEffects.Intoxicated.description",
    summary: "RTR.StatusEffects.Intoxicated.summary"
  },
  distracted: {
    name: "RTR.StatusEffects.Distracted.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/distraction.svg",
    description: "RTR.StatusEffects.Distracted.description",
    summary: "RTR.StatusEffects.Distracted.summary"
  },

  // Tier I Benefical Status Effects
  bless1: {
    name: "RTR.StatusEffects.Bless1.label",
    img: "/icons/svg/aura.svg",
    description: "RTR.StatusEffects.Bless1.description",
    summary: "RTR.StatusEffects.Bless1.summary"
  },
  protection1: {
    name: "RTR.StatusEffects.Protection1.label",
    img: "icons/svg/shield.svg",
    description: "RTR.StatusEffects.Protection1.description",
    summary: "RTR.StatusEffects.Protection1.summary"
  },
  haste1: {
    name: "RTR.StatusEffects.Haste1.label",
    img: "icons/svg/wingfoot.svg",
    description: "RTR.StatusEffects.Haste1.description",
    summary: "RTR.StatusEffects.Haste1.summary",
    changes: [
      { key: "system.mp", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "2", priority: 10 },
      { key: "system.defenses.dodge", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "2", priority: 10 }
    ]
  },
  magicResistance1: {
    name: "RTR.StatusEffects.MagicResistance1.label",
    img: "icons/svg/mage-shield.svg",
    description: "RTR.StatusEffects.MagicResistance1.description",
    summary: "RTR.StatusEffects.MagicResistance1.summary"
  },
  healing1: {
    name: "RTR.StatusEffects.Healing1.label",
    img: "/icons/svg/regen.svg",
    description: "RTR.StatusEffects.Healing1.description",
    summary: "RTR.StatusEffects.Healing1.summary"
  },
  invisible1: {
    name: "RTR.StatusEffects.Invisible1.label",
    img: "icons/svg/invisible.svg",
    description: "RTR.StatusEffects.Invisible1.description",
    summary: "RTR.StatusEffects.Invisible1.summary",
    changes: [
      { key: "system.skills.stealth.rank", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: "5", priority: 10 }
    ]
  },
  focused: {
    name: "RTR.StatusEffects.Focused.label",
    img: "/systems/reclaim-the-realm/assets/icons/status-effects/eye-target.svg",
    description: "RTR.StatusEffects.Focused.description",
    summary: "RTR.StatusEffects.Focused.summary"
  },
}