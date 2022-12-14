import { InvalidMessageError } from "./errors";

export class Device {
    private readonly numberOfUniqueCharacters: number;

    constructor(numberOfCharacters = 4){
        this.numberOfUniqueCharacters = numberOfCharacters;
    }

    public parseMessage(message: string): number {
        let index = 0;
        let buffer = "";
        while (index < message.length){
            index ++;
            const character = message[index -1];
            const uniqueChains = buffer.split(character)
            if (uniqueChains.length > 0) {
                buffer = uniqueChains[uniqueChains.length - 1] + character
            } else {
                buffer += character
            }
            if (buffer.length == this.numberOfUniqueCharacters){
                return index
            }
        }
        throw new InvalidMessageError(`The message ${message} is not valid`);
    }
}
    