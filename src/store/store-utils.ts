import { SWEntity, SWEntityType, SWPerson } from '@/api/api-types';
import { orderBy } from 'lodash-es';
import { Person, PersonSortKey, PlanetsMap, Pojo } from './store-types';

// returns a new array sorted by parameters
export function orderPersonsBy(items: Person[], columnName: PersonSortKey, isDescending: boolean) {
  if (!items || !items.length) return [];
  const order = isDescending ? 'desc' : 'asc';
  return orderBy(items, columnName, order);
}

// returns a new Persons array by adding the planet Names, ids and parsing dates
export function resolvePlanets(persons: SWPerson[], planets: PlanetsMap): Person[] {
  if (!persons || !persons.length) return [];
  return persons.map((person) => {
    /* This code could be reduced but this way is more expressive and self explanatory.
     * In some cases the minifier can reduce the number of expression
     * so is always better to write expressive code */
    const planetId = getIdFromURL('planets', person.homeworld);
    const planet = planets[planetId];
    const planetName = planet ? planet.name : '';
    const created = new Date(person.created);
    const edited = new Date(person.edited);
    return {
      ...person,
      id: getIdFromURL('people', person.url),
      planetName,
      planetId,
      created,
      edited,
    };
  });
}

export function resolveIds<T extends SWEntity>(items: T[], entity: SWEntityType): T[] {
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
