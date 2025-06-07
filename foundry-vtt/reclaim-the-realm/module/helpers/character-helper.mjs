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
    }else if (currentXp >= 30000 && currentXp <= 50000) {
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
    switch(str) {
        case -7:
            return {cc: 1000, lpd: 2};
        case -6:
            return {cc: 3, lpd: 6};
        case -5:
            return {cc: 5, lpd: 10};
        case -4:
            return {cc: 10, lpd: 20};
        case -3:
            return {cc: 15, lpd: 30};
        case -2:
            return {cc: 20, lpd: 50};
        case -1:
            return {cc: 25, lpd: 70};
        case 0:
            return {cc: 30, lpd: 100};
        case 1:
            return {cc: 40, lpd: 150};
        case 2:
            return {cc: 50, lpd: 250};
        case 3:
            return {cc: 65, lpd: 400};
        case 4:
            return {cc: 80, lpd: 650};
        case 5:
            return {cc: 100, lpd: 1000};
        case 6:
            return {cc: 150, lpd: 1500};
        case 7:
            return {cc: 250, lpd: 2500};
        case 8:
            return {cc: 400, lpd: 4000};
        case 9:
            return {cc: 650, lpd: 6500};
        case 10:
            return {cc: 1000, lpd: 10000};
        case 11:
            return {cc: 2000, lpd: 20000};
        case 12:
            return {cc: 3000, lpd: 35000};
        case 13:
            return {cc: 6000, lpd: 60000};
        case 14:
            return {cc: 7500, lpd: 100000};
        case 15:
            return {cc: 10000, lpd: 200000};
        case 16:
            return {cc: 15000, lpd: 350000};
        case 17:
            return {cc: 20000, lpd: 600000};
        case 18:
            return {cc: 30000, lpd: 1000000};
        case 19:
            return {cc: 50000, lpd: 2500000};
        case 20:
            return {cc: 75000, lpd: 5000000};
    }
}