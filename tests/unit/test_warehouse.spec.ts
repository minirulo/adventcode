import { Stack, WareHouse } from "@domain/stack";
import {NotEnoughCratesError} from "@domain/errors";

describe("Test Day 5 - Stack", () =>{
    
    function generate_new_stack(): Stack {
        return new Stack(1, [{"name": "M"}, {"name": "N"}, {"name": "Z"}]);
    }

    it("Test remove crates from stack returns correct order", () => {
        const stack = generate_new_stack();
        
        const expected = stack.remove(2);

        expect(expected).toEqual([{"name": "Z"}, {"name": "N"}]);
    });

    it("Test add crates to stack append in correct order", () => {
        const stack = generate_new_stack();
        
        stack.add([{"name": "A"}, {"name": "P"}]);
        
        expect(stack.crates).toEqual([{"name": "M"}, {"name": "N"}, {"name": "Z"}, {"name": "A"}, {"name": "P"}]);
    });

    it("Test get last crate from stack after removal", () => {
        const stack = generate_new_stack();
        
        stack.remove(1);
        
        expect(stack.lastCrate).toEqual({"name": "N"});
    });

    it("Test get last of empty stack throws error", () => {
        const stack = generate_new_stack();
        
        stack.remove(3);
        
        expect(() => stack.lastCrate).toThrowError(NotEnoughCratesError);
    });

    it("Test attempt to remove larger amount of crates throws error", () => {
        const stack = generate_new_stack();
        
        const removeCrates = (numberOfCrates: number) =>{
            stack.remove(numberOfCrates);
        }

        expect(() => removeCrates(4)).toThrowError(NotEnoughCratesError);
    });
});

describe("Test Day 5 - WareHouse", () =>{
    function generate_stacks(): Array<Stack> {
        return [
            new Stack(1, [{"name": "M"}, {"name": "N"}, {"name": "R"}]),
            new Stack(3, [{"name": "A"}, {"name": "E"}]),
            new Stack(2, [{"name": "C"}])
        ];
    }

    it("Test warehouse transaction with the CrateMover-9000", () => {
        const stacks = generate_stacks();
        
        const transaction = {"numberOfCrates": 2, "origin": stacks[0], "destination": stacks[1] }
        WareHouse.transferCrates([transaction], 9000);

        expect(stacks[0].crates).toEqual([{"name": "M"}]);
        expect(stacks[1].crates).toEqual([{"name": "A"}, {"name": "E"}, {"name": "R"}, {"name": "N"}]);
    });

    it("Test warehouse transaction with the CrateMover-9001", () => {
        const stacks = generate_stacks();
        
        const transaction = {"numberOfCrates": 2, "origin": stacks[0], "destination": stacks[1] }
        WareHouse.transferCrates([transaction], 9001);

        expect(stacks[0].crates).toEqual([{"name": "M"}]);
        expect(stacks[1].crates).toEqual([{"name": "A"}, {"name": "E"}, {"name": "N"}, {"name": "R"}]);
    });

    it("Test warehouse last crates", () => {
        const stacks = generate_stacks();

        expect(WareHouse.lastCrates(stacks)).toEqual("RCE");
    });
});