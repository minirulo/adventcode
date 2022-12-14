import { InvalidCrateMoverError } from "./errors";

export interface Command {
    stream: string;
}

export class ParseMessage implements Command {
    public readonly numberOfCharacters: number;
    public readonly stream: string;

    constructor(characters: number, message: string){
        this.numberOfCharacters = characters;
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

export class CheckElfDuties implements Command {
    public readonly fullyOverlap: boolean;
    public readonly stream: string;

    constructor(fullyOverlap: boolean, message: string){
        this.fullyOverlap =fullyOverlap;
        this.stream = message;
    }
}