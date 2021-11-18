export type urlRef = string; // url to find the related relationship in the API

export interface SWPerson {
  name: string;
  height: string; // must be translated to number
  mass: string; // must be translated to number
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: urlRef;
  films: urlRef[];
  species: urlRef[];
  vehicles: urlRef[];
  starships: urlRef[];
  created: Date;
  edited: Date;
  url: urlRef; // ID
}

export interface SWPlanet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
  residents: urlRef[];
  films: urlRef[];
  created: Date;
  edited: Date;
  url: urlRef; // ID
}

export type SWEntity = SWPerson | SWPlanet;
export type SWEntityType = 'people' | 'planets'; // string that match the name in the url ie: https://swapi.dev/api/<people>/

export interface PaginatedResponse<T> {
  count: number; // total number of items in the collection
  next: urlRef | null; // next page url
  previous: urlRef | null; // previous page url
  results: T[]; // data returned by the api
}
