import { FileParser } from "@adapters/file_parser";

describe("Test Day 6 - Device message parser", () => {
    it("Test device parses message", async () => {
        const message = "t7e3L$sHa^eB3eNTry1n@2Sa8t7geDsMiP";

        expect(await FileParser.parseDeviceFile("tests/integration/dummy_message.txt")).toEqual(message);
    })
});