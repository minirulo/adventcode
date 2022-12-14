import { Choice, RockPaperScissorsMatch } from "@domain/strategy";
import { InvalidMatchError } from "@domain/errors";

describe("Test Day 2 - Rock Paper Scissors normal", () =>{
    it("Test rocks wins scissors", () => {
        const match = new RockPaperScissorsMatch(Choice.ROCK, Choice.SCISSORS);

        expect(match.score).toEqual(7);
    });

    it("Test paper wins rock", () => {
        const match = new RockPaperScissorsMatch(Choice.PAPER, Choice.ROCK);
        
        expect(match.score).toEqual(8);
    });

    it("Test scissors wins paper", () => {
        const match = new RockPaperScissorsMatch(Choice.SCISSORS, Choice.PAPER);
        
        expect(match.score).toEqual(9);
    });

    it("Test rocks loses against paper", () => {
        const match = new RockPaperScissorsMatch(Choice.ROCK, Choice.PAPER);

        expect(match.score).toEqual(1);
    });

    it("Test paper loses against scissors", () => {
        const match = new RockPaperScissorsMatch(Choice.PAPER, Choice.SCISSORS);
        
        expect(match.score).toEqual(2);
    });

    it("Test scissors loses against  rock", () => {
        const match = new RockPaperScissorsMatch(Choice.SCISSORS, Choice.ROCK);
        
        expect(match.score).toEqual(3);
    });

    it("Test rocks equals", () => {
        const match = new RockPaperScissorsMatch(Choice.ROCK, Choice.ROCK);

        expect(match.score).toEqual(4);
    });

    it("Test paper equals", () => {
        const match = new RockPaperScissorsMatch(Choice.PAPER, Choice.PAPER);
        
        expect(match.score).toEqual(5);
    });

    it("Test scissors equals", () => {
        const match = new RockPaperScissorsMatch(Choice.SCISSORS, Choice.SCISSORS);
        
        expect(match.score).toEqual(6);
    });

    it("Test lizard against spock is not valid", () => {
        expect(() => new RockPaperScissorsMatch(0, 5)).toThrowError(InvalidMatchError);
    });
});