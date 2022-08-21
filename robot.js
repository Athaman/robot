// This could be moved out into its own constants file maybe and imported in but for simplicity it can live here.
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

module.exports = class Robot {
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
        this.amIDead(x, y, direction);
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    move() {
        if (!this.isOnTable()) return;
        // Move forward one square as per the "direction" attribute.
        // Confirm the location is on the board and ignore the command entirely if it isn't.
        let x = this.x;
        let y = this.y;
        let direction = this.direction;
        if (direction === 'NORTH') {
            y++;
        } else if (direction === 'EAST') {
            x++;
        } else if (direction === 'SOUTH') {
            y--;
        } else if (direction === 'WEST') {
            x--;
        }
        this.amIDead(x, y, direction);
        this.x = x;
        this.y = y;
    }

    left() {        
        if (!this.isOnTable()) return;
        // Get directions index of current direction
        let currentDirection = directions.indexOf(this.direction);
        // +3 % 4 will always move the direction 1 down in the array.
        this.direction = directions[(currentDirection + 3) % 4];
    }

    right() {
        if (!this.isOnTable()) return;
        let currentDirection = directions.indexOf(this.direction);
        this.direction = directions[(currentDirection + 1) % 4];
    }

    report() {
        if (!this.isOnTable()) return;
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

    isOnTable() {
        // There should be no way 1 is undefined while the others are but may as well check em all.
        if (this.x === undefined || this.y === undefined || this.direction === undefined) {
            return false;
        } else {
            return true;
        }
    }

}