export function registerHandlebarsHelpers() {
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

    Handlebars.registerHelper('formatRequirements', function (requirements) {
        let requirementsText = [];
        if (requirements.minimumLevel > 0) {
            requirementsText.push(`LEVEL: ${requirements.minimumLevel}`);
        } if (requirements.minimumMartialLevel > 0) {
            requirementsText.push(`MARTIAL LEVEL: ${requirements.minimumMartialLevel}`);
        } if (requirements.minimumSpellLevel > 0) {
            requirementsText.push(`SPELL LEVEL: ${requirements.minimumSpellLevel}`);
        } if (requirements.minimumStr > 0) {
            requirementsText.push(`STR: ${requirements.minimumStr}`);
        } if (requirements.minimumAgi > 0) {
            requirementsText.push(`AGI: ${requirements.minimumAgi}`);
        } if (requirements.minimumCon > 0) {
            requirementsText.push(`CON: ${requirements.minimumCon}`);
        } if (requirements.minimumInt > 0) {
            requirementsText.push(`INT: ${requirements.minimumInt}`);
        } if (requirements.minimumSpi > 0) {
            requirementsText.push(`SPI: ${requirements.minimumSpi}`);
        } if (requirements.minimumPer > 0) {
            requirementsText.push(`PER: ${requirements.minimumPer}`);
        } if (requirements.minimumCha > 0) {
            requirementsText.push(`CHA: ${requirements.minimumCha}`);
        } if (requirements.skillRankRequirement && requirements.skillRankRequirement.skill && requirements.skillRankRequirement.rank > 0) {
            requirementsText.push(`Skill: ${requirements.skillRankRequirement.skill}: ${requirements.skillRankRequirement.rank}`);
        } if (requirements.requiredClass) {
            requirementsText.push(`Class: ${requirements.requiredClass}`);
        } if (requirements.requiredPerk) {
            requirementsText.push(`Perk: ${requirements.requiredPerk}`);
        } if (requirements.requiredNotSelectedPerk) {
            requirementsText.push(`Not Perk: ${requirements.requiredNotSelectedPerk}`);
        } if (requirements.otherRequirements) {
            requirementsText.push(`Other: ${requirements.otherRequirements}`);
        }

        if (requirementsText.length === 0) {
            requirementsText.push('No Requirements');
        }

        return requirementsText;
    });
}