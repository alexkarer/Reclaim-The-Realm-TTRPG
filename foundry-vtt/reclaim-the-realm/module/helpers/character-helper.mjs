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