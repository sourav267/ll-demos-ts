export class ParkingTicket {
    private ticketId: string;
    private licensePlate: string;
    private spotNumber: number;
    private entryTime: Date;
    private exitTime: Date | null;

    constructor(licensePlate: string, spotNumber: number) {
        this.ticketId = this.generateTicketId();
        this.licensePlate = licensePlate;
        this.spotNumber = spotNumber;
        this.entryTime = new Date();
        this.exitTime = null;
    }

    private generateTicketId(): string {
        return `TICKET_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    getTicketId(): string {
        return this.ticketId;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    getSpotNumber(): number {
        return this.spotNumber;
    }

    getEntryTime(): Date {
        return this.entryTime;
    }

    getExitTime(): Date | null {
        return this.exitTime;
    }

    markExit(): void {
        this.exitTime = new Date();
    }

    calculateParkingDuration(): number {
        if (!this.exitTime) {
            return 0;
        }
        return Math.ceil((this.exitTime.getTime() - this.entryTime.getTime()) / (1000 * 60 * 60)); // hours
    }
}
