import { StreamParser } from "@adapters/impl/stream_parser";
import { Stack, Transaction } from "@domain/stack";
import { Choice, RockPaperScissorsMatch } from "@domain/strategy";
import { readFileSync } from "fs";
import { Rucksack } from "@domain/rucksack";

describe("Test Day 1 - Elf Supply parser", () => {
    it("Test adapters parse input", async () => {
        const supplies = [
            { calories: 6000 },
            { calories: 4000 },
            { calories: 11000 },
            { calories: 24000 },
            { calories: 10000 }
        ];
        const stream =  readFileSync("tests/dummy_data/example_supply.txt", "utf8");
        expect(await StreamParser.parseSupplyFile(stream)).toEqual({elfSupplies: supplies });
    })
});

describe("Test Day 2 - Rock Paper Scissors Strategy", () => {
    it("Test adapters parse input", async () => {
        const matches = [
            new RockPaperScissorsMatch(Choice.SCISSORS, Choice.PAPER),
            new RockPaperScissorsMatch(Choice.PAPER, Choice.ROCK),
            new RockPaperScissorsMatch(Choice.PAPER, Choice.ROCK),
            new RockPaperScissorsMatch(Choice.ROCK, Choice.PAPER),
        ];
        const stream =  readFileSync("tests/dummy_data/example_strategy.txt", "utf8");
        expect(await StreamParser.parseStrategyFile(stream)).toEqual({strategy: matches });
    })
});

describe("Test Day 2 - Rucksack Cleaning", () => {
    it("Test adapters parse input", async () => {
        const rucksacks = [
            new Rucksack("vJrwpWtwJgWrhcsFMMfFFhFp"),
            new Rucksack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"),
            new Rucksack("PmmdzqPrVvPwwTWBwg"),
            new Rucksack("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn"),
            new Rucksack("ttgJtRGJQctTZtZT"),
            new Rucksack("CrZsJsPPZsGzwwsLwLmpwMDw"),
        ];
        const stream =  readFileSync("tests/dummy_data/example_rucksacks.txt", "utf8");
        expect(await StreamParser.parseRucksackFile(stream)).toEqual({rucksacks: rucksacks });
    })
});

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
        const stream =  readFileSync("tests/dummy_data/example_duty.txt", "utf8");
        expect(await StreamParser.parseDutyFile(stream)).toEqual({"elfDuties": duties });
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

        const stream =  readFileSync("tests/dummy_data/example_warehouse.txt", "utf8");
        expect(await StreamParser.parseStackFile(stream)).toEqual({"stacks": stacks, "transactions": transactions});
    })
});