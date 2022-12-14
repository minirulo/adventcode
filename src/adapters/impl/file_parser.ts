import { Stack, Transaction } from "@domain/stack";
import { IParser, ParseResult } from "@adapters/parser";


class ParseError extends Error{
    constructor(m?: string) {
        super(m);
    }
}


export class FileParser implements IParser {
    private readonly ACTIONS: {[key: string]: (stream: string) => ParseResult} = {
        "ELFDUTY": FileParser.parseDutyFile,
        "STACK": FileParser.parseStackFile,
        "DEVICE": (stream: string) => { return { parsedMessage: stream }; }
    }

    public parse(stream: string, inputType: string): ParseResult {
        if(!Object.keys(this.ACTIONS).includes(inputType)){
            throw new ParseError("Allowed input types are ELFDUTY | STACK | DEVICE");
        }
        return this.ACTIONS[inputType](stream);
    }

    public static parseDutyFile(stream: string): ParseResult  {
        const duties: Array<Array<number>> = [];
        for(const chain of stream.split("\n")){
            let elfPairEndpoints: Array<number> = [];
            for(const elfPair of chain.split(",")){
                const endpoints = elfPair.split("-");
                elfPairEndpoints = elfPairEndpoints.concat(endpoints.map((endpoint) => parseInt(endpoint)));
            }
            duties.push(elfPairEndpoints)
        }
        return { elfDuties: duties };
    }

    public static parseTransactionChain(transactionChain: string, stacks: Array<Stack>): Transaction {
        const splitChain = transactionChain.split(" ", 6);
        const origin = stacks.find((stack) => stack.id == parseInt(splitChain[3]));
        const destination = stacks.find((stack) => stack.id == parseInt(splitChain[5]));
        if((origin == undefined) || (destination == undefined)){
            throw new ParseError("Invalid Sample")
        }
        return { 
            numberOfCrates: parseInt(splitChain[1]),
            origin: origin,
            destination: destination,
        }
    }

    public static parseStackChain(stackChain: string, stacks: Array<Stack>): void {
        let stackId = 1;
        for(let c=1;c<stackChain.length;c+=4){
            const crateName = stackChain.charAt(c);
            if(crateName.match(/[a-zA-Z]/)){
                const stack = stacks.find((stack) => stack.id == stackId);
                stack?.insert({"name":crateName}, 0);
            }
            stackId++;
        }
    }

    public static parseStackFile(stream: string): ParseResult  {
        const stacks: Array<Stack> = [];
        const transactions: Array<Transaction> = [];
        for(const chain of stream.split("\n")){
            if(stacks.length == 0){
                let stackId = 1;
                for(let c=1;c<chain.length;c+=4){
                    stacks.push(new Stack(stackId, []));
                    stackId++;
                }
            }
            if(chain.startsWith("move")){
                transactions.push(FileParser.parseTransactionChain(chain, stacks));
            } else if(chain.length > 0) {
                FileParser.parseStackChain(chain, stacks)
            }
        }
        return { stacks: stacks, transactions: transactions};
    }
}