const prompt = require('prompt-sync')({sigint: true});

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

class Robot {
    constructor() {
        // For this example the constructor should be decoupled from the PLACE command but in other scenarios they could be combined
        // Robot should be instantiated with an undefined location and direction
        // Robot needs to maintain an x coordinate, a y coordinate, and a direction attribute
        this.x = undefined;
        this.y = undefined;
        this.direction = undefined;
        // NOTE it doesn't really make sense to instantiate the robot without it existing on the board but could be useful if you wanted to spin up a bunch of robots and place them as needed as a memory vs compute trade.
    }

    // Take an existing robot and place it on the table. Can be called when robot is already on table. Cannot fall off table.
    place(x, y, direction) {
        // Set robot's coordinates as per given commands
        // Check to see if placement is on table and ignore command entirely if it isn't.
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    move() {
        console.log("Moved");
        // Move forward one square as per the "direction" attribute.
        // Confirm the location is on the board and ignore the command entirely if it isn't.
    }

    left() {
        console.log("Lefted");
        // Rotate the robot 90 degrees left
        // TODO make direction an enum between 1 and 4 and use modulo to do this cool instead of just a switch statement?
    }

    right() {
        console.log("Righted");
        // Rotate the robot 90 degrees right
        // TODO as above but the other way.
    }

    report() {
        console.log(`
        Robot is located at:
        x: ${this.x},
        y: ${this.y},
        facing: ${this.direction}
        `);
    }

    amIDead(x, y, direction) {
        if (x > 4 || x < 0) {
            throw new Error ("Looks like your robot would have fallen off the side edge so we ignored that one");
        }
        if (y > 4 || y < 0) {
            throw new Error ("Looks like your robot would have fallen off the top or bottom edge so we ignored that one");
        }
        if (!directions.includes(direction)) {
            throw new Error (`There are 4 directions that we work with around here and ${direction} ain't one of them`);
        }
    }

}


const robot = new Robot();

// Since this is a command line interface we will open up with a user entry prompt and handle it accordingly then call for another prompt
// The spec doesn't detail an exit command but I assume we want to be able to leave this without sending a signal interrupt
// Text commands from user will be parsed and routed to command the robot.
const requestInput = () => {
    const input = prompt("Please enter a command: ");
    parseInput(input);
}

const parseInput = (input) => {
    // TODO defensify this further, at the moment input should always be a string from the prompt-sync library so this should work fine but could be made more detailed
    // Could also use regex to find commands inside of strings in case of a bump character at the start
    // Could also toLowerCase it to prevent caps sensitivity but the instructions seemed pretty keen on PLACE so I'll leave it
    const inputs = input.split(' ');
    const command = inputs[0]
    switch (command) {
        case 'PLACE': 
            robot.place(inputs[1], inputs[2], inputs[3]);
            break;
        case 'MOVE':
            robot.move()
            break;
        case 'LEFT':
            robot.left()
            break;
        case 'RIGHT': 
            robot.right()
            break;
        case 'REPORT':
            robot.report()
            break;
        case 'q':
            console.log("Kthxbai");
            process.exit();
        default: 
            console.log("That didn't seem like a legit command... try again?");
    }
    requestInput();
}

requestInput();