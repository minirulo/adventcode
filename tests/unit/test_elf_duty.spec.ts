import { ElfDuties } from "@domain/elfduty";

describe("Test Day 4 - Elf Duties Overlap", () =>{

    it("test_first_elf_duty_overlaps_second_elf_duty", () => {
        const elf_couple = ElfDuties.generateElfDuties(1, 1000, 25, 250);

        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_overlaps_first_elf_duty", () => { 
        const elf_couple = ElfDuties.generateElfDuties(25, 250, 1, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_overlaps_second_elf_duty_if_beginnings_match", () => { 
        const elf_couple = ElfDuties.generateElfDuties(25, 1000, 25, 250);

        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_overlaps_second_elf_duty_if_ends_match", () => { 
        const elf_couple = ElfDuties.generateElfDuties(1, 1000, 25, 1000);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_overlaps_first_elf_duty_if_beginnings_match", () => { 
        const elf_couple = ElfDuties.generateElfDuties(1, 250, 1, 1000);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_second_elf_duty_overlaps_first_elf_duty_if_ends_match", () => { 
        const elf_couple = ElfDuties.generateElfDuties(25, 1000, 1, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeTruthy();
    });

    it("test_first_elf_duty_does_not_overlap_second_elf_duty", () => { 
        const elf_couple = ElfDuties.generateElfDuties(1, 25, 250, 1000);

        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeFalsy();
    });

    it("test_second_elf_duty_does_not_overlap_first_elf_duty", () => { 
        const elf_couple = ElfDuties.generateElfDuties(250, 1000, 1, 25);
        
        expect(ElfDuties.areElfsDutiesOverlaping(elf_couple[0], elf_couple[1])).toBeFalsy();
    });

});

describe("Test Day 4 - Counter", () =>{
    it("Test counter", () => {
        const goodDutySample = [
            [2, 4, 6, 8],
            [2, 3, 4, 5],
            [5, 7, 7, 9],
            [2, 8, 3, 7],
            [6, 6, 4, 6],
            [2, 6, 4, 8]
        ];

        expect(ElfDuties.countOverlapDuties(goodDutySample)).toBe(2);
    });

});