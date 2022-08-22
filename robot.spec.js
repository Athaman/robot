const Robot = require('./robot');

describe("Robot Class", () => {
    const robot = new Robot();

    test("Has all expected methods", () => {
        expect(typeof robot.place).toBe("function");
        expect(typeof robot.move).toBe("function");
        expect(typeof robot.left).toBe("function");
        expect(typeof robot.right).toBe("function");
        expect(typeof robot.report).toBe("function");
        expect(typeof robot.amIDead).toBe("function");
        expect(typeof robot.isOnTable).toBe("function");
    });

    test("Place() is called with args", ()=> {
        const placeSpy = jest.spyOn(robot, "place");
        const args = [1, 1, 'EAST'];
        const result = robot.place(...args);
        expect(result).toBeUndefined();
        expect(placeSpy).toHaveBeenCalledWith(...args);

        // Restore the mock and revert original implementation.
        placeSpy.mockClear();
    });
    
    test("Place() is called with args", ()=> {
        const placeSpy = jest.spyOn(robot, "place");
        const args = [1, 1, 'EAST'];
        const result = robot.place(...args);
        expect(result).toBeUndefined();
        expect(placeSpy).toHaveBeenCalledWith(...args);

        // Restore the mock and revert original implementation.
        placeSpy.mockClear();
    });

    
    test("Place() throws an error when given bad arguments", ()=> {
        function testPlace(robot) {
            const args = [5, 1, 'EAST'];
            robot.place(...args);
        }
        expect(testPlace).toThrow();
    });
});