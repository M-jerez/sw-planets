import { SWEntity, SWEntityType, SWPerson } from '@/api/api-types';
import { orderBy } from 'lodash-es';
import { Entity, Person, PersonSortKey, PlanetsMap, Pojo, RootState } from './store-types';

// returns a new array sorted by parameters
export function orderPersonsBy(items: Person[], columnName: PersonSortKey, isDescending: boolean) {
  if (!items || !items.length) return [];
  const order = isDescending ? 'desc' : 'asc';
  return orderBy(items, columnName, order);
}

// returns a new Persons array by adding the planet Names, ids, and all extra fields required for the ui
export function normalizePersons(persons: SWPerson[], planets: PlanetsMap): Person[] {
  if (!persons || !persons.length) return [];
  return persons.map((person) => {
    /* This code could be reduced but this way is more expressive and self explanatory.
     * In some cases the minifier can reduce the number of expression
     * so is always better to write expressive code */
    const planetId = getIdFromURL('planets', person.homeworld);
    const planet = planets[planetId];
    const planetName = planet ? planet.name : '';
    const nameLowerCase = person.name.toLowerCase();
    return {
      ...person,
      id: getIdFromURL('people', person.url),
      planetName,
      planetId,
      massNum: sanitizeNumber(person.mass),
      heighNum: sanitizeNumber(person.height),
      nameLowerCase,
      nameLowerNonAlpha: person.name.toLowerCase().replace(/\W/, ''),
    };
  });
}

export function normalizeIds<T extends SWEntity>(items: T[], entity: SWEntityType): Entity[] {
  return items.map((item) => ({
    ...item,
    id: getIdFromURL(entity, item.url),
  }));
}

// transforms an Array into an Object using the property keyNames as keys
export function arrayToMap<T extends Pojo>(items: T[], keyName = 'id'): { [keys: string]: T } {
  if (!items || !items.length) return {};
  // could also use something from lodash like keyBy: return keyBy(items, keyName);
  return items.reduce((prev, planet) => {
    const id = planet[keyName];
    if (typeof id === 'undefined')
      throw new Error(`Invalid key ${keyName}, is not defined in object ${JSON.stringify(planet)}`);
    return {
      ...prev,
      [id]: planet,
    };
  }, {});
}

/**
 *
 * @param entity
 * @param urlID `https://swapi.dev/api/people/1` or `https://swapi.dev/api/people/2`
 */
export function getIdFromURL(entity: SWEntityType, urlID: string): number {
  const onlyPath = urlID.replace(`https://swapi.dev/api/${entity}/`, '');
  const pathParts = onlyPath.split('/');
  const idString = pathParts[0] === '' ? pathParts[1] : pathParts[0];
  return parseInt(idString, 10);
}

export function sanitizeNumber(num: string): number {
  const noColons = num.replaceAll(',', '');
  const n = Number(noColons);
  return isNaN(n) ? -1 : n;
}

export function filterByNames(persons: Person[], filter: string): Person[] {
  return persons.filter((person) => {
    return (
      person.nameLowerCase.includes(filter) ||
      person.nameLowerNonAlpha.includes(filter) ||
      filter.includes(person.nameLowerCase) ||
      filter.includes(person.nameLowerNonAlpha)
    );
  });
}

export function isStateSameAsAPI(state: RootState, countPersonsAPI: number, countPlanetsAPI: number): boolean {
  const arePersonsLoaded =
    state.persons.length === countPersonsAPI && state.persons.length === Object.keys(state.personsMap).length;
  const arePlanetsLoaded =
    state.planets.length === countPlanetsAPI && state.planets.length === Object.keys(state.planetsMap).length;
  return arePersonsLoaded && arePlanetsLoaded;
}
