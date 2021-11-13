import { urlRef } from "./models";

/**
 * This could be an autogenerated 
 */
export const Api = {
    persons: {
        getAll: (page = 1) => fetch(`https://swapi.dev/api/people/?page=${page}`),
        getById: (id: number) => fetch(`https://swapi.dev/api/people/${id}`),
    },
    planets: {
        getAll: (page = 1) => fetch(`https://swapi.dev/api/planets/?page=${page}`),
        getById: (id: number) => fetch(`https://swapi.dev/api/planets/${id}`),
    },
    getResource: (url: urlRef) => fetch(url),
}