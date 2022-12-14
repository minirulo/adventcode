import { FakeParser } from ".";
import MessageBus from "@services/messagebus";
import { CheckElfSupplies, CheckElfDuties, MoveCrates, ParseMessage, GetStrategyResult } from "@domain/commands";

describe('Test Service Handlers', () =>{
    it('Test max ammount of calories by one elf', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new CheckElfSupplies(1, "");

        expect(bus.handle(command)).toBe(24000);
    })

    it('Test max ammount of calories by multiple elves', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new CheckElfSupplies(3, "");

        expect(bus.handle(command)).toBe(45000);
    })

    it('Test score following assumed strategy', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new GetStrategyResult("");

        expect(bus.handle(command)).toBe(26);
    })

    it('Test score following winning strategy', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new GetStrategyResult("", true);

        expect(bus.handle(command)).toBe(18);
    })

    it('Test Check ElfDuties fully overlaped', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new CheckElfDuties(true,"");

        expect(bus.handle(command)).toBe(2);
    })

    it('Test Check ElfDuties partial overlaped', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new CheckElfDuties(false, "");

        expect(bus.handle(command)).toBe(4);
    })

    it('Test Move Crate 9000 operation', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new MoveCrates(9000,"");

        expect(bus.handle(command)).toBe("CMZ");
    })

    it('Test Move Crate 9001 operation', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new MoveCrates(9001, "");

        expect(bus.handle(command)).toBe("MCD");
    })

    it('Test Parse packet', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new ParseMessage(4,"");

        expect(bus.handle(command)).toBe(7);
    })

    it('Test parse message', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new ParseMessage(14, "");

        expect(bus.handle(command)).toBe(19);
    })
})