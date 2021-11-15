import { SWPerson } from '@/api/api-types';
import { orderBy } from 'lodash-es';
import { Person, PersonSortKey, PlanetsMap, Pojo } from './store-types';

// returns a new array sorted by parameters
export function orderPersonsBy(items: Person[], columnName: PersonSortKey, isDescending: boolean) {
  if (!items || !items.length) return [];
  const order = isDescending ? 'desc' : 'asc';
  return orderBy(items, columnName, order);
}

// returns a new Persons array by adding the planet Names
export function fillPlanetNames(persons: SWPerson[], planets: PlanetsMap): Person[] {
  if (!persons || !persons.length) return [];
  return persons.map((person) => {
    /* This code could be reduced but this way is more expressive and self explanatory.
     * In some cases the minifier can reduce the number of expression
     * so is always better to write expressive code */
    const planetId = person.homeworld;
    const planet = planets[planetId];
    const planetName = planet ? planet.name : '';
    return {
      ...person,
      planetName,
    };
  });
}

// transforms an Array into an Object using the property keyNames as keys
export function arrayToMap<T extends Pojo>(items: T[], keyName = 'url'): { [keys: string]: T } {
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
