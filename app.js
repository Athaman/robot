const Robot = require('./robot');
const Menu = require('./menu');

const example = new Robot();

while(true) {
    const input = Menu.requestInput();
    const command = Menu.parseInput(input);
    Menu.routeCommand(command, example);
}


