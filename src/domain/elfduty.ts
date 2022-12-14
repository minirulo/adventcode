export interface ElfDuty {
    start: number;
    end: number;
}

export class ElfDuties {
    public static generateElfDuties(
        duty_a_start: number,
        duty_a_end: number,
        duty_b_start: number,
        duty_b_end: number,
    ): Array<ElfDuty> {
        return [{"start": duty_a_start, "end": duty_a_end}, {"start": duty_b_start, "end": duty_b_end},];
    }

    public static areElvesDutiesOverlaping(elf_a: ElfDuty, elf_b: ElfDuty, fullOverlap = true): boolean {
        if(!fullOverlap){
            return ! ((elf_a.start > elf_b.end) || (elf_b.start > elf_a.end));
        }

        if ((elf_a.start == elf_b.start) || (elf_a.end == elf_b.end)){
            return true;
        } else if(elf_a.start > elf_b.start) {
            return elf_a.end < elf_b.end;
        }
        
        return elf_b.end < elf_a.end
    }
    
    public static countOverlapDuties(duties: Array<Array<number>>, fullOverlap: boolean): number {
        let overlappedDuties = 0;
        for(const dutyPairs of duties){
            const elfDuties = this.generateElfDuties(dutyPairs[0], dutyPairs[1], dutyPairs[2], dutyPairs[3]);
            if(this.areElvesDutiesOverlaping(elfDuties[0], elfDuties[1], fullOverlap)){
                overlappedDuties++;
            }
        }
        return overlappedDuties;
    }
}
