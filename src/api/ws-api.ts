import { PaginatedResponse, SWEntity, SWPerson, SWPlanet, urlRef } from './models';

export type getAllPayload = { page?: number };
export type getByIdPayload = { id: number };
export type getResourcePayload = { url: urlRef };
export type entity = 'people' | 'planets';

export const get = (url: urlRef) => fetch(url).then((resp) => resp.json());

export const getFullCollection = async (url: urlRef, maxIterations = 50): Promise<PaginatedResponse<SWEntity>> => {
  const results: SWEntity[] = [];
  const originalUrl = url;
  // only for loops and for of supports async/await
  let index: number;
  for (index = 0; index < maxIterations; index++) {
    const response: PaginatedResponse<SWEntity> = await fetch(url).then((resp) => resp.json());
    results.push(...response.results);
    if (!response.next) {
      response.results = results;
      return response;
    }
    url = response.next;
  }
  throw {
    originalUrl,
    lastUrl: url,
    message: 'Collection is too big, it is not possible to retrieve the full collection',
    totalRequests: index,
    totalItems: results.length,
  };
};

export function entityApi<T extends SWEntity>(entity: entity) {
  return {
    entity,
    getAll: () => getFullCollection(`https://swapi.dev/api/${entity}/?page=1`) as Promise<PaginatedResponse<T>>,
    getPage: (page = 1) => get(`https://swapi.dev/api/${entity}/?page=${page}`) as Promise<PaginatedResponse<T>>,
    getById: (id: string) => get(`https://swapi.dev/api/${entity}/${id}`) as Promise<T>,
  };
}

export const SWApi = {
  persons: entityApi<SWPerson>('people'),
  planets: entityApi<SWPlanet>('planets'),
  getResource: ({ url }: getResourcePayload) => get(url) as Promise<PaginatedResponse<SWEntity>> | Promise<SWEntity>,
};
