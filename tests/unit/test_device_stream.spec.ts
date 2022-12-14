import { Device } from "@domain/device";

describe("Test Day 6 - Device message parser", () => {
    it("Test device parses message", () => {
        const message = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
        const device = new Device();

        expect(device.parseMessage(message)).toBe(7);
    })
});