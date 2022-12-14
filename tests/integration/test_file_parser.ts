import { FileParser } from "@adapters/impl/file_parser";
import { Stack, Transaction } from "@domain/stack";
import { readFileSync } from "fs";

describe("Test Day 4 - Elf Duty parser", () => {
    it("Test adapters parse input", async () => {
        const duties = [
            [2, 4, 6, 8],
            [2, 3, 4, 5],
            [5, 7, 7, 9],
            [2, 8, 3, 7],
            [6, 6, 4, 6],
            [2, 6, 4, 8]
        ];
        const stream =  readFileSync("tests/integration/example_duty.txt", "utf8");
        expect(await FileParser.parseDutyFile(stream)).toEqual({"elfDuties": duties });
    })
});

describe("Test Day 5 - Warehouse parser", () => {
    it("Test adapters parse input", async () => {
        const stacks = [
            new Stack(1, [{"name":"Z"}, {"name":"N"}]),
            new Stack(2, [{"name":"M"}, {"name":"C"},  {"name":"D"}]),
            new Stack(3, [{"name":"P"}]),
        ]

        const transactions: Array<Transaction> = [
            {numberOfCrates: 1, origin: stacks[1], destination: stacks[0] },
            {numberOfCrates: 3, origin: stacks[0], destination: stacks[2] },
            {numberOfCrates: 2, origin: stacks[1], destination: stacks[0] },
            {numberOfCrates: 1, origin: stacks[0], destination: stacks[1] }
        ]

        const stream =  readFileSync("tests/integration/example_warehouse.txt", "utf8");
        expect(await FileParser.parseStackFile(stream)).toEqual({"stacks": stacks, "transactions": transactions});
    })
});