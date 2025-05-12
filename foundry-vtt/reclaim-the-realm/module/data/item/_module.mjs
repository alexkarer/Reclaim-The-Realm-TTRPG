import { ClassTechniqueDataModel } from "./class-technique.mjs";
import { MartialManeuverDataModel } from "./martial-maneuver.mjs";
import { SpellDataModel } from "./spell.mjs";
import { EquipmentDataModel } from "./equipment.mjs";

export {
    ClassTechniqueDataModel,
    MartialManeuverDataModel,
    SpellDataModel,
    EquipmentDataModel
};

export const config = {
  classTechnique: ClassTechniqueDataModel,
  martialManeuver: MartialManeuverDataModel,
  spell: SpellDataModel,
  equipment: EquipmentDataModel 
};