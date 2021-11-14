import { PaginatedResponse, SWEntity } from '@/api/api-types';
import { entityApi, getFullCollection, SWApi } from '@/api/sw-api';

describe('api-client', () => {
  let pagResponse: PaginatedResponse<SWEntity>;
  beforeEach(() => {
    pagResponse = { count: 2, next: null, results: [{}, {}] } as PaginatedResponse<SWEntity>;
    // npm @types/whatwg-fetch required for this to work properly
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(pagResponse) } as Response)
    );
  });

  it('should get all entities from a collection', async () => {
    const response1 = await entityApi('people').getAll();
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response1.results).toEqual([{}, {}]);
  });

  it('should get entities from a collection (paginated)', async () => {
    const response1 = await entityApi('people').getPage();
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');

    const response2 = await entityApi('people').getPage(2);
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=2');
  });

  it('should get an entity by id', async () => {
    const response = await entityApi('people').getById('3');
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/3');
  });

  it('should get any resource from the url', async () => {
    const response1 = await SWApi.getResource('https://swapi.dev/api/abc');
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/abc');

    const response2 = await SWApi.getResource('https://swapi.dev/api/123');
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/123');
  });

  it('should get all pages from collection', async () => {
    let counter = 0;
    globalThis.fetch = jest.fn(() => {
      counter++;
      if (counter >= 3) pagResponse.next = null;
      else pagResponse.next = 'https://swapi.dev/api/entity/?page=X';
      return Promise.resolve({ ok: true, json: () => Promise.resolve(pagResponse) } as Response);
    });
    const response1 = await getFullCollection('https://swapi.dev/api/entity/?page=1');
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/entity/?page=1');
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(response1.results).toEqual([{}, {}, {}, {}, {}, {}]);
  });

  it('should fail when getting all the pages when the collection is too large', async () => {
    pagResponse.next = 'https://swapi.dev/api/entity/?page=X';

    let error;
    try {
      const response = await getFullCollection('https://swapi.dev/api/entity/?page=1');
    } catch (e) {
      error = e;
    }

    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/entity/?page=1');
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/entity/?page=X');
    expect(fetch).toHaveBeenCalledTimes(50);
    expect(error).toEqual({
      originalUrl: 'https://swapi.dev/api/entity/?page=1',
      lastUrl: 'https://swapi.dev/api/entity/?page=X',
      message: 'Collection is too big, it is not possible to retrieve the full collection',
      totalRequests: 50,
      totalItems: 50 * 2,
    } as any);
  });
});
