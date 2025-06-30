import { Direction } from "../enums/direction";
import { FloorNumber } from "../enums/floor";

export class Display {
    private floorNumber: FloorNumber;
    private direction: Direction;
    private weight: number;

    constructor(floorNumber: FloorNumber = FloorNumber.FLOOR_1, direction: Direction = Direction.IDLE, weight: number = 0) {
        this.floorNumber = floorNumber;
        this.direction = direction;
        this.weight = weight;
    }

    public getFloorNumber(): FloorNumber {
        return this.floorNumber;
    }

    public setFloorNumber(floorNumber: FloorNumber): void {
        this.floorNumber = floorNumber;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public setDirection(direction: Direction): void {
        this.direction = direction;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public displayInfo(): string {
        return `Floor: ${this.floorNumber}, Direction: ${this.direction}, Weight: ${this.weight}kg`;
    }

}