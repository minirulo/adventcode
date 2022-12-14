import { IParser } from "@adapters/parser";
import { CheckElfDuties, Command, MoveCrates, ParseMessage } from "@domain/commands";
import { Device } from "@domain/device";
import { ElfDuties } from "@domain/elfduty";
import { Stack, Transaction, WareHouse } from "@domain/stack";

class Services {
    public static checkElfDuties(command: Command, parser: IParser): number {
        const result = parser.parse(command.stream, "ELFDUTY");
        return ElfDuties.countOverlapDuties(result.elfDuties as Array<Array<number>>, (command as CheckElfDuties).fullyOverlap)
    }

    public static moveCrates(command: Command, parser: IParser): string {
        const result = parser.parse(command.stream, "STACK");
        WareHouse.transferCrates(result.transactions as Array<Transaction>, (command as MoveCrates).crateMover);
        return WareHouse.lastCrates(result.stacks as Array<Stack>);
    }

    public static parseMessage(command: Command, parser: IParser): number {
        const result = parser.parse(command.stream, "DEVICE");
        const device = new Device((command as ParseMessage).numberOfCharacters);
        return device.parseMessage(result.parsedMessage as string);
    }
}

export type Handler = (command: Command, parser: IParser) => string | number;

export const HANDLERS: { [key: string]: Handler } = {
    "CheckElfDuties": Services.checkElfDuties,
    "MoveCrates": Services.moveCrates,
    "ParseMessage": Services.parseMessage
}