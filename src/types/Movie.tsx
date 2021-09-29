export interface Movie {
  _id: string;
  fullplot: string;
  imdb: Imdb;
  year: number;
  plot: string;
  genres: string[];
  rated: string;
  metacritic?: number;
  title: string;
  lastupdated: string;
  languages: string[];
  writers: string[];
  type: string;
  tomatoes: Tomatoes;
  poster: string;
  num_mflix_comments: number;
  released: string;
  awards: Awards;
  countries: string[];
  cast: string[];
  directors: string[];
  runtime: number;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  date: string;
  email: string;
  movie_id: string;
  name: string;
  text: string;
}

export interface Awards {
  wins: number;
  nominations: number;
  text: string;
}

export interface Tomatoes {
  website?: string;
  viewer: Viewer;
  dvd: string;
  critic: Viewer;
  boxOffice?: string;
  consensus?: string;
  rotten: number;
  production: string;
  lastUpdated: string;
  fresh: number;
}

export interface Viewer {
  rating: number;
  numReviews: number;
  meter: number;
}

export interface Imdb {
  rating: number;
  votes: number;
  id: number;
}
