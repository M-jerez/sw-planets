import { Api } from "@/api/api-client";

describe('api-client', () => {
    beforeEach(() => {
        // npm @types/whatwg-fetch required for this to work properly
        globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));
    });

    it("should get all persons (paginated)", async () => {
        const response1 = await Api.persons.getAll();
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');

        const response2 = await Api.persons.getAll(2);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=2');
    });

    it("should get a person by it's id", async () => {
        const response = await Api.persons.getById(2);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/2');
    });

    it("should get all planets (paginated)", async () => {
        const response1 = await Api.planets.getAll();
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/?page=1');

        const response2 = await Api.planets.getAll(2);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/?page=2');
    });

    it("should get a planet by it's id", async () => {
        const response = await Api.planets.getById(1);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
    });

    it("should get any resource from the url", async () => {
        const response1 = await Api.getResource('https://swapi.dev/api/abc');
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/abc');

        const response2 = await Api.getResource('https://swapi.dev/api/123');
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/123');
    });
});