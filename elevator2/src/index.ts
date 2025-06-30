import { Direction } from "./enums/direction";
import { FloorNumber } from "./enums/floor";
import { ElevatorSystem } from "./services/elevatorSystem";

export class ElevatorSystemDemo {
  public static async runDemo(): Promise<void> {
    const elevatorSystem = ElevatorSystem.getInstance();
    
    console.log('=== Elevator System Demo ===\n');
    console.log(elevatorSystem.getSystemStatus());

    try {
      // Request elevator from floor 5 going up
      console.log('\n--- Requesting elevator from floor 5 going up ---');
      const elevator1 = await elevatorSystem.requestElevator(FloorNumber.FLOOR_5, Direction.UP);
      
      // Select floor 10 inside the elevator
      console.log('\n--- Selecting floor 10 inside elevator ---');
      elevatorSystem.selectFloor(elevator1.getElevatorNumber(), FloorNumber.FLOOR_10);
      
      // Wait a bit and show status
      setTimeout(() => {
        console.log('\n' + elevatorSystem.getSystemStatus());
      }, 3000);

      // Request another elevator from floor 12 going down
      setTimeout(async () => {
        console.log('\n--- Requesting elevator from floor 12 going down ---');
        const elevator2 = await elevatorSystem.requestElevator(FloorNumber.FLOOR_12, Direction.DOWN);
        elevatorSystem.selectFloor(elevator2.getElevatorNumber(), FloorNumber.FLOOR_3);
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
    }
  }
}

ElevatorSystemDemo.runDemo();