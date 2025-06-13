export const RTR = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
RTR.attributes = {
  str: 'RTR.Attribute.Str.long',
  agi: 'RTR.Attribute.Agi.long',
  con: 'RTR.Attribute.Con.long',
  spi: 'RTR.Attribute.Spi.long',
  int: 'RTR.Attribute.Int.long',
  per: 'RTR.Attribute.Per.long',
  cha: 'RTR.Attribute.Cha.long',
};

RTR.attributeAbbreviations = {
  str: 'RTR.Attribute.Str.abbr',
  agi: 'RTR.Attribute.Agi.abbr',
  con: 'RTR.Attribute.Con.abbr',
  spi: 'RTR.Attribute.Spi.abbr',
  int: 'RTR.Attribute.Int.abbr',
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
  Phyiscial": "RTR.DamageTypes.Phyiscial",
  Fire": "Fire",
  "Frost": "Frost",
  "Corrosive": "Corrosive",
  "Sonic": "Sonic",
  "Electric": "Electric",
  "Poison": "Poison",
  "Psychic": "Psychic",
  "Cosmic": "Cosmic",
  "Holy": "Holy",
  "Unholy": "Unholy"
}