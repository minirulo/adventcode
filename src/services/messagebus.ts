import { StreamParser } from "@adapters/impl/stream_parser";
import { IParser } from "@adapters/parser";
import { Command } from "@domain/commands"
import { Handler, HANDLERS } from "./handlers";


export default class MessageBus {
    private readonly handlers:  { [key: string]: Handler };
    private readonly parser: IParser;

    constructor(parser: IParser = new StreamParser(), commandHandlers: { [key: string]: Handler } = HANDLERS){
        this.handlers = commandHandlers;
        this.parser = parser;
    }

    public handle(command: Command): string | number {
        console.debug(`Handling ${command.constructor.name} command`);
        const handler = this.handlers[command.constructor.name];
        return handler(command, this.parser);
    }
}