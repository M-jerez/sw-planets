import { urlRef } from "./models";

export const ApiClient = {
    getAllPersons: (page = 1) => fetch(`https://swapi.dev/api/people/?page=${page}`),
    getPlanet: (id: number) => fetch(`https://swapi.dev/api/planets/${id}`),
    getResource: (url: urlRef) => fetch(url),
}