import { IParser } from "@adapters/parser";
import { CheckElfDuties, CheckElfSupplies, Command, MoveCrates, ParseMessage } from "@domain/commands";
import { Device } from "@domain/device";
import { ElfDuties } from "@domain/elfduty";
import { Stack, Transaction, WareHouse } from "@domain/stack";
import { ElfSupply } from "@domain/supplies";

export class Services {
    public static checkElfSupplies(command: Command, parser: IParser): number {
        const result = parser.parse(command.stream, "ELFSUPPLY");
        const sortedElves = (result.elfSupplies as Array<ElfSupply>).sort((a, b) => b.calories - a.calories);
        let calories = 0;
        for(let e=0;e<(command as CheckElfSupplies).numberOfElves;e++){
            calories += sortedElves[e].calories;
        }
        return calories;
    }

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
    "CheckElfSupplies": Services.checkElfSupplies,
    "CheckElfDuties": Services.checkElfDuties,
    "MoveCrates": Services.moveCrates,
    "ParseMessage": Services.parseMessage
}