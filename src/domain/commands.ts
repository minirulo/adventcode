import { InvalidCrateMoverError } from "./errors";

export interface Command {
    stream: string;
}

export class CheckElfSupplies implements Command {
    public readonly numberOfElves: number;
    public readonly stream: string;

    constructor(elves = 1, message: string){
        this.numberOfElves = elves;
        this.stream = message;
    }
}

export class GetStrategyResult implements Command {
    public readonly stream: string;
    public readonly winningStrategy: boolean;
    constructor(message: string, winStrategy = false){
        this.stream = message;
        this.winningStrategy = winStrategy;
    }
}

export class GetRucksackPriority implements Command {
    public readonly stream: string;
    constructor(message: string){
        this.stream = message;
    }
}

export class CheckElfDuties implements Command {
    public readonly fullyOverlap: boolean;
    public readonly stream: string;

    constructor(fullyOverlap: boolean, message: string){
        this.fullyOverlap =fullyOverlap;
        this.stream = message;
    }
}

export class MoveCrates implements Command {
    public readonly crateMover: number;
    public readonly stream: string;
    private readonly CRATES = [9000, 9001]

    constructor(mover: number, message: string){
        if(!this.CRATES.includes(mover)){
            throw new InvalidCrateMoverError("Unrecognised crate mover");
        }
        this.crateMover = mover;
        this.stream = message;
    }
}

export class ParseMessage implements Command {
    public readonly numberOfCharacters: number;
    public readonly stream: string;

    constructor(characters: number, message: string){
        this.numberOfCharacters = characters;
        this.stream = message;
    }
}