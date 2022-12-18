
import { Rucksack } from "@domain/rucksack";
import { Stack, Transaction } from "@domain/stack";
import { RockPaperScissorsMatch } from "@domain/strategy";
import { ElfSupply } from "@domain/supplies";

export interface ParseResult {
    elfSupplies?: Array<ElfSupply>;
    strategy?: Array<RockPaperScissorsMatch>;
    rucksacks?: Array<Rucksack>;
    elfDuties?: Array<Array<number>>;
    stacks?: Array<Stack>;
    transactions?: Array<Transaction>;
    parsedMessage?: string;
}

export class ParseError extends Error{
    constructor(m?: string) {
        super(m);
    }
}

export interface IParser {
    parse(stream: string, inputType: string): ParseResult;
}
