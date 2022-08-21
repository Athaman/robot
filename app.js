const prompt = require('prompt-sync')({sigint: true});
const Robot = require('./robot');
const example = new Robot();

// Since this is a command line interface we will open up with a user entry prompt and handle it accordingly then call for another prompt
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
    try {

        switch (command) {
            case 'PLACE': 
                example.place(inputs[1], inputs[2], inputs[3]);
                break;
            case 'MOVE':
                example.move()
                break;
            case 'LEFT':
                example.left()
                break;
            case 'RIGHT': 
                example.right()
                break;
            case 'REPORT':
                example.report()
                break;
            // The spec doesn't detail an exit command but I assume we want to be able to leave this without sending a signal interrupt
            case 'q':
                console.log("Kthxbai");
                process.exit();
            default: 
                console.log("That didn't seem like a legit command... try again?");
        }
    } catch (error) {
        // Silently ignoring fails for the win. Really this should be given to the user as some kind of feedback.
        // console.error(error);
    }
    requestInput();
}

requestInput();