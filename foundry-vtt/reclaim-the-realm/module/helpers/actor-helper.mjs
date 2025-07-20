export function calculateXPMilestonesAndLevel(currentXp) {
    const progression = {};
    if (currentXp >= 0 && currentXp <= 100) {
        progression.xpPrevMilestone = 0;
        progression.xpNextMilestone = 100;
        progression.level = 1;
    } else if (currentXp >= 100 && currentXp <= 400) {
        progression.xpPrevMilestone = 100;
        progression.xpNextMilestone = 400;
        progression.level = 2;
    } else if (currentXp >= 400 && currentXp <= 1300) {
        progression.xpPrevMilestone = 400;
        progression.xpNextMilestone = 1300;
        progression.level = 3;
    } else if (currentXp >= 1300 && currentXp <= 3100) {
        progression.xpPrevMilestone = 1300;
        progression.xpNextMilestone = 3100;
        progression.level = 4;
    } else if (currentXp >= 3100 && currentXp <= 6500) {
        progression.xpPrevMilestone = 3100;
        progression.xpNextMilestone = 6500;
        progression.level = 5;
    } else if (currentXp >= 6500 && currentXp <= 14000) {
        progression.xpPrevMilestone = 6500;
        progression.xpNextMilestone = 14000;
        progression.level = 6;
    } else if (currentXp >= 14000 && currentXp <= 30000) {
        progression.xpPrevMilestone = 14000;
        progression.xpNextMilestone = 30000;
        progression.level = 7;
    } else if (currentXp >= 30000 && currentXp <= 50000) {
        progression.xpPrevMilestone = 30000;
        progression.xpNextMilestone = 50000;
        progression.level = 8;
    } else if (currentXp >= 50000 && currentXp <= 80000) {
        progression.xpPrevMilestone = 50000;
        progression.xpNextMilestone = 80000;
        progression.level = 9;
    } else if (currentXp >= 80000 && currentXp <= 130000) {
        progression.xpPrevMilestone = 80000;
        progression.xpNextMilestone = 130000;
        progression.level = 10;
    } else if (currentXp >= 130000 && currentXp <= 200000) {
        progression.xpPrevMilestone = 130000;
        progression.xpNextMilestone = 200000;
        progression.level = 11;
    } else if (currentXp >= 200000) {
        progression.xpPrevMilestone = 200000;
        progression.xpNextMilestone = 200000;
        progression.level = 12;
    }
    return progression;
}

export function getApForLevel(level) {
    if (level < 1) {
        return 2;
    } else if (level < 4) {
        return 3;
    } else if (level < 8) {
        return 4;
    } else if (level < 12) {
        return 5;
    } else if (level < 16) {
        return 6;
    } else if (level < 20) {
        return 7;
    } else if (level >= 20) {
        return 8;
    }
}

export function getStrCarryLiftValues(str) {
    switch (str) {
        case -7:
            return { cc: 1000, lpd: 2 };
        case -6:
            return { cc: 3, lpd: 6 };
        case -5:
            return { cc: 5, lpd: 10 };
        case -4:
            return { cc: 10, lpd: 20 };
        case -3:
            return { cc: 15, lpd: 30 };
        case -2:
            return { cc: 20, lpd: 50 };
        case -1:
            return { cc: 25, lpd: 70 };
        case 0:
            return { cc: 30, lpd: 100 };
        case 1:
            return { cc: 40, lpd: 150 };
        case 2:
            return { cc: 50, lpd: 250 };
        case 3:
            return { cc: 65, lpd: 400 };
        case 4:
            return { cc: 80, lpd: 650 };
        case 5:
            return { cc: 100, lpd: 1000 };
        case 6:
            return { cc: 150, lpd: 1500 };
        case 7:
            return { cc: 250, lpd: 2500 };
        case 8:
            return { cc: 400, lpd: 4000 };
        case 9:
            return { cc: 650, lpd: 6500 };
        case 10:
            return { cc: 1000, lpd: 10000 };
        case 11:
            return { cc: 2000, lpd: 20000 };
        case 12:
            return { cc: 3000, lpd: 35000 };
        case 13:
            return { cc: 6000, lpd: 60000 };
        case 14:
            return { cc: 7500, lpd: 100000 };
        case 15:
            return { cc: 10000, lpd: 200000 };
        case 16:
            return { cc: 15000, lpd: 350000 };
        case 17:
            return { cc: 20000, lpd: 600000 };
        case 18:
            return { cc: 30000, lpd: 1000000 };
        case 19:
            return { cc: 50000, lpd: 2500000 };
        case 20:
            return { cc: 75000, lpd: 5000000 };
    }
}

export function getMartialDamage(str) {
    switch (str) {
        case -6:
            return { light: 'd2', medium: 'd4', heavy: 'd6' };
        case -5:
            return { light: 'd2', medium: 'd4', heavy: 'd6' };
        case -4:
            return { light: 'd3', medium: 'd6', heavy: 'd8' };
        case -3:
            return { light: 'd3', medium: 'd6', heavy: 'd8' };
        case -2:
            return { light: 'd4', medium: 'd8', heavy: 'd10' };
        case -1:
            return { light: 'd4', medium: 'd8', heavy: 'd10' };
        case 0:
            return { light: 'd6', medium: 'd10', heavy: 'd12' };
        case 1:
            return { light: 'd6', medium: 'd10+1', heavy: 'd12+1' };
        case 2:
            return { light: 'd6+1', medium: 'd10+2', heavy: 'd12+2' };
        case 3:
            return { light: 'd6+2', medium: 'd10+3', heavy: 'd12+3' };
        case 4:
            return { light: 'd6+3', medium: 'd10+4', heavy: 'd12+5' };
        case 5:
            return { light: '2d6', medium: '2d10', heavy: '2d12' };
        case 6:
            return { light: '2d6+1', medium: '2d10+2', heavy: '2d12+3' };
        case 7:
            return { light: '2d6+2', medium: '2d10+4', heavy: '2d12+5' };
        case 8:
            return { light: '3d6', medium: '3d10', heavy: '3d12' };
        case 9:
            return { light: '3d6+2', medium: '3d10+3', heavy: '3d12+4' };
        case 10:
            return { light: '4d6', medium: '4d10', heavy: '4d12' };
        case 11:
            return { light: '5d6', medium: '5d10', heavy: '5d12' };
        case 12:
            return { light: '6d6', medium: '6d10', heavy: '6d12' };
        case 13:
            return { light: '7d6', medium: '7d10', heavy: '7d12' };
        case 14:
            return { light: '8d6', medium: '8d10', heavy: '8d12' };
        case 15:
            return { light: '9d6', medium: '9d10', heavy: '9d12' };
        case 16:
            return { light: '10d6', medium: '10d10', heavy: '10d12' };
        case 17:
            return { light: '12d6', medium: '12d10', heavy: '12d12' };
        case 18:
            return { light: '14d6', medium: '14d10', heavy: '14d12' };
        case 19:
            return { light: '16d6', medium: '16d10', heavy: '16d12' };
        case 20:
            return { light: '18d6', medium: '18d10', heavy: '18d12' };
        case 21:
            return { light: '20d6', medium: '20d10', heavy: '20d12' };
    }
}

export function calculateXPReward(level) {
    switch (level) {
        case 0.125:
            return 6;
        case 0.25:
            return 12;
        case 0.5:
            return 25;
        case 1:
            return 50;
        case 2:
            return 100;
        case 3:
            return 200;
        case 4:
            return 400;
        case 5:
            return 800;
        case 6:
            return 1400;
        case 7:
            return 2500;
        case 8:
            return 4000;
        case 9:
            return 6000;
        case 10:
            return 9000;
        case 11:
            return 13000;
        case 12:
            return 20000;
        case 13:
            return 30000;
        case 14:
            return 42000;
        case 15:
            return 55000;
        case 16:
            return 70000;
        case 17:
            return 90000;
        case 18:
            return 120000;
        case 19:
            return 160000;
        case 20:
            return 220000;
    }
    return 0;
}

/**
 * @param {string} actorType 
 * @returns {PrototypeTokenData} protype token config
 */
export function getPrototypeTokenConfig(actorType) {
    const tokenDefaults = {
        displayBars: CONST.TOKEN_DISPLAY_MODES.HOVER,
        vision: true,
        sight: { enabled: true, range: 1.5 }
    };

    if (actorType === 'npc') {
        Object.assign(tokenDefaults, {
            displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
            disposition: CONST.TOKEN_DISPOSITIONS.HOSTILE,
            actorLink: false,
            appendNumber: true
        });
    } else if (actorType === 'character') {
        Object.assign(tokenDefaults, {
            displayName: CONST.TOKEN_DISPLAY_MODES.HOVER,
            actorLink: true
        });
    }
    return tokenDefaults
}