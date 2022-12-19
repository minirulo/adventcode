import { CleanRucksackError, InvalidCharacterError, BadgeNotFoundError } from "./errors"

export class Rucksack {
    private readonly compartmentA: string;
    private readonly compartmentB: string;

    constructor(items: string){
        const index = items.length / 2;
        this.compartmentA = items.substring(0, index)
        this.compartmentB = items.substring(index, items.length)
    }

    public compareCompartments(): string {
        for(const c of this.compartmentA){
            if(this.compartmentB.includes(c)){
                return c;
            }
        }
        throw new CleanRucksackError();
    }

    public getBadge(rucksacks: Array<Rucksack>): string {
        for(const c of this.items){
            const badges = [];
            for(const rucksack of rucksacks){
                badges.push(rucksack.items.includes(c) ? c : '');
            }
            if(badges.filter((badge) => badge.length == 0).length == 0){
                return badges[0];
            }
        }
        throw new BadgeNotFoundError();
    }

    public get items(){
        return this.compartmentA.concat(this.compartmentB);
    }
}

export class Prioritizer {
    public static getRucksackPriority(rucksack: Rucksack): number {
        return this.getCharacterPriority(rucksack.compareCompartments());
    }

    public static getBadgePriority(rucksacks: Array<Rucksack>): number {
        const first = rucksacks[0]
        const rest = rucksacks.splice(1, rucksacks.length - 1);
        return this.getCharacterPriority(first.getBadge(rest));
    }

    // In Unicode, the character 'a' has a value of 97,
    // whereas 'A' has a value of 65
    public static getCharacterPriority(character: string){
        if(character.length != 1){
            throw new InvalidCharacterError();
        }
        const unicodeCharacter = character.charCodeAt(0)
        return unicodeCharacter >= 97 ? unicodeCharacter - 96: unicodeCharacter - 38;
    }
}
