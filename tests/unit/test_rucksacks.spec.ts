import { Rucksack, Prioritizer } from "@domain/rucksack";
import { CleanRucksackError, InvalidCharacterError, BadgeNotFoundError } from "@domain/errors";

describe("Test Day 2 - Rucksack CLeaning", () =>{
    it("Test rucksack compares its compartments", () => {
        const rucksack = new Rucksack("vJrwpWtwJgWrhcsFMMfFFhFp");

        expect(rucksack.compareCompartments()).toEqual("p");
    });

    it("Test clean rucksack throws while comparing compartments", () => {
        const rucksack = new Rucksack("abcdefgh");

        expect(() => rucksack.compareCompartments()).toThrowError(CleanRucksackError);
    });

    it("Test prioritizer checks correct character priority for capital letter", () => {
        expect(Prioritizer.getCharacterPriority("L")).toEqual(38);
    });

    it("Test prioritizer checks correct character priority for lowcase letter", () => {
        expect(Prioritizer.getCharacterPriority("t")).toEqual(20);
    });

    it("Test prioritizer throws on invalid character", () => {
        expect(() => Prioritizer.getCharacterPriority("RAUL")).toThrowError(InvalidCharacterError);
    });
});

describe("Test Day 2 - Badge assesment", () =>{
    it("Test find badge in group of rucksacks", () => {
        const first = new Rucksack("vJrwpWtwJgWrhcsFMMfFFhFp");
        const second = new Rucksack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL");
        const third = new Rucksack("PmmdzqPrVvPwwTWBwg");

        expect(first.getBadge([second, third])).toEqual("r");
    });

    it("Test prioritizer throws on invalid character", () => {
        const rucksacks = [
            new Rucksack("vJrwpWtwJgWrhcsFMMfFFhFp"),
            new Rucksack("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL"),
            new Rucksack("PmmdzqPrVvPwwTWBwg")
        ]
        expect(Prioritizer.getBadgePriority(rucksacks)).toBe(18);
    });

    it("Test prioritizer throws if there is no badge", () => {
        const rucksacks = [
            new Rucksack("abcdefgh"),
            new Rucksack("ijklmnop"),
            new Rucksack("qrstuvxz")
        ]
        expect(() => Prioritizer.getBadgePriority(rucksacks)).toThrowError(BadgeNotFoundError);
    });
});
