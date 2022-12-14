import { NotEnoughCratesError } from "./errors";

export interface Crate {
    name: string;
}

export interface Transaction {
    numberOfCrates: number;
    origin: Stack;
    destination: Stack;
}



export class Stack {
    private readonly _id: number;
    private _crates: Array<Crate>;

    constructor(id: number, crates: Array<Crate>) {
        this._id = id;
        this._crates = crates;
    }

    public remove(numberOfCrates: number, crateMover = 9000): Array<Crate> {
        if(this._crates.length < numberOfCrates){
            throw new NotEnoughCratesError();
        }
        const crates = this._crates.splice(this._crates.length - numberOfCrates);
        return crateMover == 9000 ? crates.reverse(): crates;
    }

    public add(crates: Array<Crate>): void {
        this._crates = this._crates.concat(crates);
    }

    public insert(crate: Crate, index: number): void {
        this._crates.splice(index, 0, crate);
    }

    get id(): number {
        return this._id;
    }

    get crates(): Array<Crate> {
        return this._crates;
    }

    get lastCrate(): Crate {
        if(this._crates.length == 0){
            throw new NotEnoughCratesError();
        }
        return this._crates[this._crates.length - 1];
    }
}

export class WareHouse {
    public static transferCrates(transactions: Array<Transaction>, crateMover: number): void {
        for(const transaction of transactions) {
            const cratesToTransfer = transaction.origin.remove(transaction.numberOfCrates, crateMover);
            transaction.destination.add(cratesToTransfer);
        }
    }

    public static lastCrates(stacks: Array<Stack>): string {
        stacks.sort((a, b) => {
            if(a.id > b.id){
                return 1;
            } else if (a.id < b.id){
                return -1;
            }
            return 0;
        });
        let lastCrates = ""
        stacks.forEach(stack => {
            lastCrates += stack.lastCrate.name;
        });
        return lastCrates;
    }
}
    