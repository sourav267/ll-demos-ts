import Movie from "./movies";
import Theater from "./theater";
import Screen from "./screen";
import Seat from "./seat";

class Show {
  private id: string;
  private movie: Movie;
  private screen: Screen;
  private theater: Theater;
  private startTime: Date;
  private endTime: Date;
  private basePrice: number;

  constructor(
    id: string,
    movie: Movie,
    screen: Screen,
    theater: Theater,
    startTime: Date,
    basePrice: number
  ) {
    this.id = id;
    this.movie = movie;
    this.screen = screen;
    this.theater = theater;
    this.startTime = startTime;
    this.endTime = new Date(startTime.getTime() + movie.getDuration() * 60000);
    this.basePrice = basePrice;
  }

  getId(): string { return this.id; }
  getMovie(): Movie { return this.movie; }
  getScreen(): Screen { return this.screen; }
  getTheater(): Theater { return this.theater; }
  getStartTime(): Date { return this.startTime; }
  getEndTime(): Date { return this.endTime; }
  getBasePrice(): number { return this.basePrice; }

  getAvailableSeats(): Seat[] {
    return this.screen.getAvailableSeats();
  }

  getTotalAvailableSeats(): number {
    return this.screen.getAvailableSeatsCount();
  }

  isActive(): boolean {
    const now = new Date();
    return now < this.startTime;
  }
}

export default Show;