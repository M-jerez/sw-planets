import { SWPerson, SWPlanet, urlRef } from '@/api/api-types';

export interface Person extends SWPerson {
  // planet name must be resolved from planets data
  planetName?: string;
  planetId: number;
  massNum: number;
  heighNum: number;
}
export interface Planet extends SWPlanet {} // eslint-disable-line

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

export const PAGE_SIZES = {
  ten: { size: 10, displayText: '10' },
  twenty: { size: 20, displayText: '20' },
  fifty: { size: 50, displayText: '50' },
  all: { size: -1, displayText: 'All' },
};

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
  filter: string | number | Date;
  pageSize: PageSize;
  currentPage: number;
  filteredPersons: Person[];
}

export type OrderByPayload = { orderBy: PersonSortKey; isDescending: boolean };
