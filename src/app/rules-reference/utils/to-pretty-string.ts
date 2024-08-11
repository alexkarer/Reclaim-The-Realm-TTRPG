import { AttributeRequirement, LevelRequirement, Requirements } from '../../../../ttrpg_resources/globals/AbilityRequirements';

export function requirementsToPrettyString(requirements: Requirements) : string {
    let requirementsPrettyString = "";
    if (requirements?.requiredLevels?.length !== 0) {
        requirementsPrettyString = levelsToPrettyString(requirements.requiredLevels);
    }
    if (requirements?.requiredAttributes?.length !== 0) {
        if (requirementsPrettyString !== "") {
            requirementsPrettyString = requirementsPrettyString + ', ';
        }
        requirementsPrettyString = attributesToPrettyString(requirements.requiredAttributes);
    }
    if (requirements?.requiredPerks?.length !== 0) {
        if (requirementsPrettyString !== "") {
            requirementsPrettyString = requirementsPrettyString + ', Perk:';
        }
        requirements.requiredPerks.forEach(requiredPerk => {
            requirementsPrettyString =  + ' ' + requirementsPrettyString + requiredPerk;
        })
    }
    if (requirements?.otherRequirements?.length !== 0) {
        if (requirementsPrettyString !== "") {
            requirementsPrettyString = requirementsPrettyString + ', ';
        }
        requirements.otherRequirements.forEach(req => {
            requirementsPrettyString = requirementsPrettyString + req;
        })
    }
    return requirementsPrettyString;
}

function levelsToPrettyString(levelRequirements: LevelRequirement[]) : string {
    let levelsPrettyString = "";
    levelRequirements.forEach(requirement => {
        if (levelsPrettyString === "") {
            levelsPrettyString = requirement.amount + ' ' + requirement.levelType
        } else {
            levelsPrettyString = levelsPrettyString + ', ' + requirement.amount + ' ' + requirement.levelType
        }
    });
    return levelsPrettyString;
}

function attributesToPrettyString(attributeRequirements: AttributeRequirement[]) : string {
    let attributesToPrettyString = "";
    attributeRequirements.forEach(requirement => {
        if (attributesToPrettyString === "") {
            attributesToPrettyString = requirement.amount + ' ' + requirement.attribute
        } else {
            attributesToPrettyString = attributesToPrettyString + ', ' + requirement.amount + ' ' + requirement.attribute
        }
    });
    return attributesToPrettyString;
}
