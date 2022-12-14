import { IParser, ParseResult, ParseError } from "@adapters/parser";
import { Stack, Transaction } from "@domain/stack";

export class FakeParser implements IParser {
    public supplies = [
        { calories: 6000 },
        { calories: 4000 },
        { calories: 11000 },
        { calories: 24000 },
        { calories: 10000 }
    ];

    public duties = [
        [2, 4, 6, 8],
        [2, 3, 4, 5],
        [5, 7, 7, 9],
        [2, 8, 3, 7],
        [6, 6, 4, 6],
        [2, 6, 4, 8]
    ];

    public stacks = [
        new Stack(1, [{"name":"Z"}, {"name":"N"}]),
        new Stack(2, [{"name":"M"}, {"name":"C"},  {"name":"D"}]),
        new Stack(3, [{"name":"P"}]),
    ];

    public transactions: Array<Transaction> = [
        {numberOfCrates: 1, origin: this.stacks[1], destination: this.stacks[0] },
        {numberOfCrates: 3, origin: this.stacks[0], destination: this.stacks[2] },
        {numberOfCrates: 2, origin: this.stacks[1], destination: this.stacks[0] },
        {numberOfCrates: 1, origin: this.stacks[0], destination: this.stacks[1] }
    ];

    private readonly ACTIONS: { [key: string]: ParseResult } = {
        "ELFSUPPLY": { elfSupplies: this.supplies },
        "ELFDUTY": { elfDuties: this.duties },
        "STACK": { stacks: this.stacks, transactions: this.transactions },
        "DEVICE": { parsedMessage: "mjqjpqmgbljsphdztnvjfqwrcgsmlb" }
    }

    public parse(stream: string, inputType: string): ParseResult{
        if(!Object.keys(this.ACTIONS).includes(inputType)){
            throw new ParseError("Allowed input types are ELFDUTY | STACK | DEVICE");
        }
        return this.ACTIONS[inputType];
    }
};