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
  Phyiscial: "RTR.DamageTypes.Phyiscial",
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

RTR.statusEffects = {
  // needed for foundry to mark combatants as defeated
  dead: {
    name: "Dead",
    img: "/icons/svg/skull.svg",
    description: "He ded"
  },
  stunned1: {
    name: "RTR.StatusEffects.Stunned1.label",
    img: "/icons/svg/daze.svg",
    description: "RTR.StatusEffects.Stunned1.description"
  },
  frightened1: {
    name: "RTR.StatusEffects.Frightened1.label",
    img: "/icons/svg/terror.svg",
    description: "RTR.StatusEffects.Frightened1.description"
  },
  burning1: {
    name: "RTR.StatusEffects.Burning1.label",
    img: "/icons/svg/fire.svg",
    description: "RTR.StatusEffects.Burning1.description"
  },
  bleeding1: {
    name: "RTR.StatusEffects.Bleeding1.label",
    img: "/icons/svg/blood.svg",
    description: "RTR.StatusEffects.Bleeding1.description"
  },
  poison1: {
    name: "RTR.StatusEffects.Poison1.label",
    img: "/icons/svg/poison.svg",
    description: "RTR.StatusEffects.Poison1.description"
  },
  charmed1: {
    name: "RTR.StatusEffects.Frightened1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Frightened1.description"
  },
  crippled1: {
    name: "RTR.StatusEffects.Crippled1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Crippled1.description"
  },
  cursed1: {
    name: "RTR.StatusEffects.Cursed1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Cursed1.description"
  },
  weakened1: {
    name: "RTR.StatusEffects.Weakened1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Weakened1.description"
  },
  vulnurable1: {
    name: "RTR.StatusEffects.Vulnurable1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Vulnurable1.description"
  },
  restrained1: {
    name: "RTR.StatusEffects.Restrained1.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Restrained1.description"
  },
  silenced: {
    name: "RTR.StatusEffects.Silenced.label",
    img: "/icons/svg/silenced.svg",
    description: "RTR.StatusEffects.Silenced.description"
  },
  deafened1: {
    name: "RTR.StatusEffects.Deafened1.label",
    img: "/icons/svg/deaf.svg",
    description: "RTR.StatusEffects.Deafened1.description"
  },
  intoxicated: {
    name: "RTR.StatusEffects.Intoxicated.label",
    img: "/icons/svg/tankard.svg",
    description: "RTR.StatusEffects.Intoxicated.description"
  },
  distracted: {
    name: "RTR.StatusEffects.Distracted.label",
    img: "/icons/svg/cancel.svg", // TODO fix
    description: "RTR.StatusEffects.Distracted.description"
  },
}