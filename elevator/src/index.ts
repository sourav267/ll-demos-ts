import { ElevatorController } from './services/ElevatorController';
import { Elevator } from './entities/Elevator';
import { Direction } from './enums/direction';

const elevators = [new Elevator(1), new Elevator(2)];
const controller = new ElevatorController(elevators);

controller.handleExternalRequest(3, Direction.UP);
controller.handleExternalRequest(5, Direction.DOWN);
controller.handleInternalRequest(1, 6);

setInterval(() => {
  controller.step();
}, 1000);