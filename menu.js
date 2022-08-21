const prompt = require('prompt-sync')({sigint: true});

// Since this is a command line interface we will open up with a user entry prompt and handle it accordingly then call for another prompt
// Text commands from user will be parsed and routed to command the robot.
const requestInput = () => {
    const input = prompt("Please enter a command: ");
    return input;
}

const parseInput = (input) => {
    // TODO defensify this further, at the moment input should always be a string from the prompt-sync library so this should work fine but could be made more detailed
    // Could also use regex to find commands inside of strings in case of a bump character at the start
    // Could also toLowerCase it to prevent caps sensitivity but the instructions seemed pretty keen on PLACE so I'll leave it
    const inputs = input.split(' ');
    const commandInfo = {
        command: inputs[0],
        arguments: inputs.slice(1)
    };
    return commandInfo;
}

const routeCommand = (commandInfo, robot) => {
    try {

        switch (commandInfo.command) {
            case 'PLACE': 
                robot.place(...commandInfo.arguments);
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
}

module.exports = {
    parseInput,
    requestInput,
    routeCommand,
}