import { InvalidMatchError } from "./errors";

export class Choice {
    public static ROCK = 1;
    public static PAPER = 2;
    public static SCISSORS = 3;
    public static LOST = 0;
    public static EQUAL = 3;
    public static VICTORY = 6;

    public static match(target: number, oponent: number): number {
        if(target == oponent){
            return Choice.EQUAL;
        }
        if(target == Choice.ROCK){
            return oponent == Choice.SCISSORS ? Choice.VICTORY : Choice.LOST;
        } else if(target == Choice.PAPER) {
            return oponent == Choice.ROCK ? Choice.VICTORY : Choice.LOST;
        }
        return oponent == Choice.PAPER ? Choice.VICTORY : Choice.LOST;
    }
}

export class RockPaperScissorsMatch {
    private readonly choice: number;
    private readonly oponent: number;
    private _winningStrategy: boolean;

    private readonly winningParse: {[key: number]: number} = {
        1: Choice.LOST,
        2: Choice.EQUAL,
        3: Choice.VICTORY
    };

    // The winning strategy variable defines wether to keep the same choice (X -> ROCK, Y -> PAPER
    // Z -> SCISSORS) or to transform it into the winning method (X -> lose, Y -> equals, Z -> win) 
    constructor(wiseChoice: number, oponentChoice: number, winningStrategy = false){
        if((wiseChoice > 3 || wiseChoice < 1) || (oponentChoice > 3 || oponentChoice < 1)){
            throw new InvalidMatchError("One of the choices is not possible in the game");
        }
        this.oponent = oponentChoice;
        this.choice = wiseChoice;
        this._winningStrategy = winningStrategy;
    }

    public get score(): number {
        let actualChoice = this.choice;
        if(this._winningStrategy){
            for(const key of Object.keys(this.winningParse)){
                if(Choice.match(parseInt(key), this.oponent) == this.winningParse[this.choice]){
                    actualChoice = parseInt(key);
                    break;
                }
            }
        }
        return actualChoice + Choice.match(actualChoice, this.oponent)
    }

    public set winningStrategy(strategy: boolean) {
        this._winningStrategy = strategy;
    }
}