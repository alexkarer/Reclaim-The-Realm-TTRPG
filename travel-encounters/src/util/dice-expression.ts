import { diceRoll } from "./random";

export function evaluateDiceExpression(diceExpr: string): string {
    let diceIndex = diceExpr.indexOf('d');
    if (diceIndex === -1) {
        return diceExpr;
    }

    // TODO: dice amount with more than 1 digit, dice number with more than 1 digit
    // TODO: more complex evaluations with multiple dice as well as constants

    let diceAmount = 1;
    if (diceIndex !== 0) {
        diceAmount = Number.parseInt(diceExpr.charAt(diceIndex-1));
    }

    let diceNumber = Number.parseInt(diceExpr.charAt(diceIndex+1));
    let result = 0;
    for (let idx = 0; idx < diceAmount; idx++) {
        result += diceRoll(diceNumber);
    }
    return result.toString();
}