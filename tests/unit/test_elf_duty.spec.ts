import { ElfDuties } from "@domain/elfduty";

describe("Test Day 4 - Elf Duties Fully  Overlap", () =>{
    it("test_first_elf_duty_fully_overlaps_second_elf_duty", () => {
        const elfCouple = ElfDuties.generateElfDuties(1, 1000, 25, 250);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_fully_overlaps_first_elf_duty", () => { 
        const elfCouple = ElfDuties.generateElfDuties(25, 250, 1, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_fully_overlaps_second_elf_duty_if_beginnings_match", () => { 
        const elfCouple = ElfDuties.generateElfDuties(25, 1000, 25, 250);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_fully_overlaps_second_elf_duty_if_ends_match", () => { 
        const elfCouple = ElfDuties.generateElfDuties(1, 1000, 25, 1000);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_fully_overlaps_first_elf_duty_if_beginnings_match", () => { 
        const elfCouple = ElfDuties.generateElfDuties(1, 250, 1, 1000);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_fully_overlaps_first_elf_duty_if_ends_match", () => { 
        const elfCouple = ElfDuties.generateElfDuties(25, 1000, 1, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_does_not_overlap_second_elf_duty", () => { 
        const elfCouple = ElfDuties.generateElfDuties(1, 25, 250, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeFalsy();
    });

    it("test_second_elf_duty_does_not_overlap_first_elf_duty", () => { 
        const elfCouple = ElfDuties.generateElfDuties(250, 1000, 1, 25);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1])).toBeFalsy();
    });
});

describe("Test Day 4 - Elf Duties Partial Overlap", () =>{
    it("test_first_elf_duty_partial_overlaps_second_elf_duty", () => {
        const elfCouple = ElfDuties.generateElfDuties(1, 200, 25, 250);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1], false)).toBeTruthy();
    });

    it("test_second_elf_duty_partial_overlaps_first_elf_duty", () => { 
        const elfCouple = ElfDuties.generateElfDuties(25, 250, 1, 200);

        expect(ElfDuties.areElfsDutiesOverlaping(elfCouple[0], elfCouple[1], false)).toBeTruthy();
    });
});

describe("Test Day 4 - Counter", () =>{
    function generateSample(): Array<Array<number>>{
        return [
            [2, 4, 6, 8],
            [2, 3, 4, 5],
            [5, 7, 7, 9],
            [2, 8, 3, 7],
            [6, 6, 4, 6],
            [2, 6, 4, 8]
        ];
    }

    it("Test fully overlap counter", () => {
        const goodDutySample = generateSample();

        expect(ElfDuties.countOverlapDuties(goodDutySample, true)).toBe(2);
    });

    it("Test fully overlap counter", () => {
        const goodDutySample = generateSample();

        expect(ElfDuties.countOverlapDuties(goodDutySample, false)).toBe(4);
    });

});