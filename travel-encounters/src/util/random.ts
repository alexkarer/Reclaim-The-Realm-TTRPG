export function diceRoll(dice: number): number {
    return Math.floor((Math.random() * dice) + 1);
}