import { SWPerson, SWPlanet, urlRef } from '@/api/api-types';

export interface Person extends SWPerson {
  id: number;
  // planet name must be resolved from planets data
  planetName?: string;
  planetId: number;

  // required fields for ui
  massNum: number;
  heighNum: number;
  nameLowerCase: string;
  nameLowerNonAlpha: string;
}
export interface Planet extends SWPlanet {
  id: number;
}

export type Entity = SWPerson | SWPlanet;

export interface Pojo {
  [key: string]: any;
}
export interface PersonsMap {
  [key: string]: Person;
}
export interface PlanetsMap {
  [key: string]: Planet;
}

export interface PageSize {
  size: number;
  displayText: string;
}

export type PersonDisplayedRow = Pick<Person, 'id' | 'name' | 'height' | 'mass' | 'created' | 'edited' | 'planetName'>;
export type PlanetDisplayed = Pick<Planet, 'id' | 'name' | 'diameter' | 'climate' | 'population'>;
export type PersonSortKey = keyof PersonDisplayedRow;

export interface RootState {
  persons: Person[];
  planets: Planet[];
  personsMap: PersonsMap;
  planetsMap: PlanetsMap;
  orderBy: PersonSortKey;
  isDescending: boolean;
  filterBy: 'name'; // only name allowed for now
  filter: string;
  pageSize: PageSize;
  currentPage: number;
  filteredPersons: Person[];
  selectedPlanet: Planet | null;
  isLoading: boolean;
}

export type OrderByPayload = { orderBy: PersonSortKey; isDescending: boolean };
