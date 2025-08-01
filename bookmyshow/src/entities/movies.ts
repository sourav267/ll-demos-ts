import { Genre, Language } from "../enums/enum";

// Movie Class
class Movie {
  private id: string;
  private title: string;
  private description: string;
  private duration: number; // in minutes
  private language: Language;
  private releaseDate: Date;
  private genres: Genre[];
  private cast: string[];
  private director: string;
  private rating: number;

  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    language: Language,
    releaseDate: Date,
    genres: Genre[],
    cast: string[],
    director: string,
    rating: number = 0
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.language = language;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.cast = cast;
    this.director = director;
    this.rating = rating;
  }

  getId(): string { return this.id; }
  getTitle(): string { return this.title; }
  getDescription(): string { return this.description; }
  getDuration(): number { return this.duration; }
  getLanguage(): Language { return this.language; }
  getReleaseDate(): Date { return this.releaseDate; }
  getGenres(): Genre[] { return this.genres; }
  getCast(): string[] { return this.cast; }
  getDirector(): string { return this.director; }
  getRating(): number { return this.rating; }
}

export default Movie;