import { Direction } from "../enums/direction";
import { RequestType } from "../enums/requestType";

export class ERequest {
  constructor(
    public floor: number,
    public direction: Direction | null,
    public type: RequestType
  ) {}
}
