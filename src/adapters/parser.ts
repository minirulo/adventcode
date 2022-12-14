
import { Stack, Transaction } from "@domain/stack";

export interface ParseResult {
    stacks?: Array<Stack>;
    transactions?: Array<Transaction>;
    parsedMessage?: string;
    elfDuties?: Array<Array<number>>;
}

export interface IParser {
    parse(stream: string, inputType: string): ParseResult;
}
