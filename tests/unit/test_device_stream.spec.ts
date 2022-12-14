import { Device } from "@domain/device";

describe("Test Day 6 - Device message parser", () => {
    it("Test device parses packet", () => {
        const message = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
        const device = new Device();

        expect(device.parseMessage(message)).toBe(7);
    })

    it("Test device parses message", () => {
        const message = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
        const device = new Device(14);

        expect(device.parseMessage(message)).toBe(19);
    })
});