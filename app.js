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
    }

    move() {
        // Move forward one square as per the "direction" attribute.
        // Confirm the location is on the board and ignore the command entirely if it isn't.
    }

    left() {
        // Rotate the robot 90 degrees left
        // TODO make direction an enum between 1 and 4 and use modulo to do this cool instead of just a switch statement?
    }

    right() {
        // Rotate the robot 90 degrees right
        // TODO as above but the other way.
    }

    report() {
        // Console log out the robots location and direction.
    }

}