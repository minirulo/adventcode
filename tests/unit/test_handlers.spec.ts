import { FakeParser } from ".";
import MessageBus from "@services/messagebus";
import * as commands from "@domain/commands";

describe("Test Day 1 - Calories services", () => {
    it('Test max ammount of calories by one elf', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.CheckElfSupplies(1, "");

        expect(bus.handle(command)).toBe(24000);
    })

    it('Test max ammount of calories by multiple elves', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.CheckElfSupplies(3, "");

        expect(bus.handle(command)).toBe(45000);
    })
});

describe("Test Day 2 - Rock Paper Scissors services", () => {
    it('Test score following assumed strategy', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.GetStrategyResult("");

        expect(bus.handle(command)).toBe(26);
    });
});

describe("Test Day 3 - Rucksack cleaning services", () => {
    it('Test get total priority of several rucksacks', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.GetRucksackPriority("");

        expect(bus.handle(command)).toBe(157);
    });
});

describe("Test Day 4 - Elf Duty services", () => {
    it('Test Check ElfDuties fully overlaped', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.CheckElfDuties(true,"");

        expect(bus.handle(command)).toBe(2);
    })

    it('Test Check ElfDuties partial overlaped', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.CheckElfDuties(false, "");

        expect(bus.handle(command)).toBe(4);
    })
});

describe("Test Day 5 - Crate Mover services", () => {
    it('Test Move Crate 9000 operation', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.MoveCrates(9000,"");

        expect(bus.handle(command)).toBe("CMZ");
    });

    it('Test Move Crate 9001 operation', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.MoveCrates(9001, "");

        expect(bus.handle(command)).toBe("MCD");
    });
});

describe("Test Day 6 - Device services", () => {
    it('Test Parse packet', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.ParseMessage(4,"");

        expect(bus.handle(command)).toBe(7);
    });

    it('Test parse message', ()=>{
        const bus = new MessageBus(new FakeParser());
        const command = new commands.ParseMessage(14, "");

        expect(bus.handle(command)).toBe(19);
    });
});
