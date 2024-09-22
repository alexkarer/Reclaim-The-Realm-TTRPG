export class Equipment {
    name!: string;
    tier!: number;
    craftingSkill!: string;
    cost!: Cost;
    weightInGram!: number;
    type!: string;
    description!: string;
}

export class Cost {
    amount!: number;
    currency!: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    static of(rawString: string): Cost | undefined {
        let amountString = rawString.substring(0, rawString.indexOf(" "));
        let amount = Number.parseFloat(amountString);

        switch (rawString.substring(rawString.length - 2)) {
            case "bc": return new Cost(amount, Currency.BC);
            case "sc": return new Cost(amount, Currency.SC);
            case "gc": return new Cost(amount, Currency.GC);
            default: return undefined;
        }
    }

    getBcValue(): number {
        switch(this.currency) {
            case Currency.BC:
                return this.amount;
            case Currency.SC:
                return this.amount * 10;
            case Currency.GC:
                return this.amount * 100;
        }
    }

    getPrettyString(): string {
        return this.amount + " " + this.currency;
    }
}

export enum Currency {
    BC = "bc",
    SC = "sc",
    GC = "gc"
}

