import { FileParser } from "@adapters/file_parser";

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

        expect(await FileParser.parseDutyFile("tests/integration/example_duty.txt")).toEqual(duties);
    })
});