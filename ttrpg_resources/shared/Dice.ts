export class DiceFormula {
    diceExpressions: DiceExpression[] = [];

    constructor(diceExpressions: DiceExpression[]) {
        this.diceExpressions = diceExpressions;
    }

    static of(rawString: string) {
        let rawDiceExpressions = rawString.split(/[+-]/);
        return rawDiceExpressions.map(rde => DiceExpression.of(rde.trim())).join();
    }

    getPrettyString(): string {
        let prettyString = this.diceExpressions.map(de => de.getPrettyString(true)).join();
        if (prettyString.charAt(0) === '+') {
            return prettyString.substring(1);
        }
        return prettyString;
    }
}

export class DiceExpression {
    amount!: number;
    dice?: Dice;

    constructor(amount: number, dice: Dice | undefined = undefined) {
        this.amount = amount;
        this.dice = dice;
    }

    static of(rawString: string) {
        let amount = 0;
        let indexDiceStart = rawString.indexOf('d');

        if (rawString.charAt(0) === '+') {
            let stringNumber = rawString.substring(1, indexDiceStart);
            amount = Number.parseInt(stringNumber);
        } else if (rawString.charAt(0) === '-') {
            let stringNumber = rawString.substring(1, indexDiceStart);
            amount = -1 * Number.parseInt(stringNumber);
        } else if (indexDiceStart !== 0) {
            let stringNumber = rawString.substring(0, indexDiceStart);
            amount = Number.parseInt(stringNumber);
        } else if (indexDiceStart === 0) {
            amount = 1;
        }
        if (indexDiceStart === -1) {
            return new DiceExpression(amount, undefined); 
        }

        let diceString = rawString.substring(indexDiceStart, rawString.length);
        switch (diceString) {
            case 'd2': return new DiceExpression(amount, Dice.D2);
            case 'd3': return new DiceExpression(amount, Dice.D3);
            case 'd4': return new DiceExpression(amount, Dice.D4);
            case 'd6': return new DiceExpression(amount, Dice.D6);
            case 'd8': return new DiceExpression(amount, Dice.D8);
            case 'd10': return new DiceExpression(amount, Dice.D10);
            case 'd12': return new DiceExpression(amount, Dice.D12);
            case 'd20': return new DiceExpression(amount, Dice.D20);
            case 'd100': return new DiceExpression(amount, Dice.D100);
            default: return new DiceExpression(0, undefined);
        }
    }

    getPrettyString(explicitPlusSign: boolean = false): string {
        if (this.amount === 0) {
            return '';
        }
        let diceString = '';
        if (this.dice) diceString = this.dice.toString();

        if (this.amount === 1) {
            if (explicitPlusSign) {
                diceString = '+' + diceString.toString();
            } else {
                diceString = diceString.toString();
            }
        } else if (this.amount > 1) {
            if (explicitPlusSign) {
                diceString = '+' + this.amount + diceString.toString();
            } else {
                diceString =  this.amount + diceString.toString();
            }
        } else if (this.amount < 0) {
            diceString =  this.amount + diceString;
        }
        return diceString; 
    }
}

export enum Dice {
    D2 = 'd2',
    D3 = 'd3',
    D4 = 'd4',
    D6 = 'd6',
    D8 = 'd8',
    D10 = 'd10',
    D12 = 'd12',
    D20 = 'd20',
    D100 = 'd100'
}