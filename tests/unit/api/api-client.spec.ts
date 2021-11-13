import { ApiClient } from "@/api/api-client";

describe('api-client', () => {
    beforeEach(() => {
        // fetch type missing => npm @types/whatwg-fetch required for this to work 
        globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));
    });

    it("should get all persons using default page 1", async () => {
        const response = await ApiClient.getAllPersons();
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');
    });

    it("should get all persons using selected page", async () => {
        const response = await ApiClient.getAllPersons(2);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=2');
    });

    it("should get the requested planet", async () => {
        const response = await ApiClient.getPlanet(1);
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
    });

    it("should get any resource from the url", async () => {
        const response1 = await ApiClient.getResource('https://swapi.dev/api/abc');
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/abc');

        const response2 = await ApiClient.getResource('https://swapi.dev/api/123');
        expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/123');
    });
});