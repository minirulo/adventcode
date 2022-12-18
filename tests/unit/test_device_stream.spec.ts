import { Device } from "@domain/device";
import { InvalidMessageError } from "@domain/errors";

describe("Test Day 6 - Device message parser", () => {
    it("Test device parses packet", () => {
        const message = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
        const device = new Device();

        expect(device.parseMessage(message)).toBe(7);
    });

    it("Test device parses message", () => {
        const message = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
        const device = new Device(14);

        expect(device.parseMessage(message)).toBe(19);
    });

    it("Test device parses when packet is at the end", () => {
        const message = "aaaaaaaaaaabcd";
        const device = new Device(4);

        expect(device.parseMessage(message)).toBe(14);
    });

    it("Test device throws on non existing message / packet", () => {
        const message = "aaaaaaaaaaaaaa";
        const device = new Device(4);

        expect(() => device.parseMessage(message)).toThrowError(InvalidMessageError);
    });
});