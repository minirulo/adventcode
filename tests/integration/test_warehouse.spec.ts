import { FileParser } from "@adapters/file_parser";
import { Stack, Transaction } from "@domain/stack";

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

        expect(await FileParser.parseStackFile("tests/integration/example_warehouse.txt")).toEqual({"stacks": stacks, "transactions": transactions});
    })
});