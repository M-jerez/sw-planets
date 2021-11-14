# `sw-planets`

Single page application with a list of people and the details about their related
home planet. The list of people and the information related to a planet can be
accessed using the swapi api:

**SWAPI api details**: https://swapi.dev/

&nbsp;&nbsp;&nbsp;&nbsp;

### `Wireframes`

A table that contains a list of users with the following columns:

- Name
- Height
- Mass
- Created
- Edited
- Planet Name

When the user clicks on the planet name link a popup is displayed showing
the following information regarding the planet:

- Name
- Diameter
- Climate
- Population

The user should be able to sort the table by each column. The user should
also be able to filter by searching the persona's name.

&nbsp;&nbsp;&nbsp;&nbsp;

### `Stack`

| Name                                                                          | Description                                 |
| ----------------------------------------------------------------------------- | ------------------------------------------- |
| [Vue.js](https://vuejs.org/)                                                  | frontend framework                          |
| [Typescript](https://www.typescriptlang.org/)                                 | Static typed language on top of JS          |
| [Vuex](https://vuex.vuejs.org/)                                               | state management system for vue             |
| [vuex-cache](https://github.com/superwf/vuex-cache)                           | cache plugin for vuex                       |
| [vuex-persisted-state](https://github.com/robinvdvleuten/vuex-persistedstate) | persistence plugin fo vuex _(page-reloads)_ |
| [swapi-ts](https://github.com/amitmtrn/swapi-ts)                              | api client for swapi written in typescript  |

&nbsp;&nbsp;&nbsp;&nbsp;

### `SWAPI limitations`

The [SWAPI](https://swapi.dev/documentation) returns all collections `paginated` ( `https://swapi.dev/api/people/?page=1` ). It is not possible to change the size of the page and does not support `orderBy` queries.

Due to the requirement for users being able to sort by columns and the relatively small size of the Api. **The adopted approach is to download the full collection from the api and do the ordering in the browser. Otherwise the data displayed would be inconsistent** as the ordering would be only done on the "partial collection" in the browser and not into the full collection from the Api.

For a large Api, and to be able to order, the Api must support both the `orderBy` and `Pagination` operations.

**Using `<entity>.url` as the id:**  
Entities from SWAPI don't have and `id` property, but have the unique `url` property, therefore this `url` property can effectively be used as the entity id.

- **pros:**
  - no need to translate url references.
  - no need to parse and extract the id from the url for every single item from the api.
- **cons:**
  - need to extract the id when doing queries by id.
  - not intuitive and prone to misinterpretation when debugging.
  - performance degradation when ordering collections?

_This implementation detail could be analyzed with in more depth to properly weight pros and cons:_

&nbsp;&nbsp;&nbsp;&nbsp;

### `Vuex Store`

### `Commands`

```sh
# Project setup
npm install
```

```sh
# Compiles and hot-reloads for development
npm run serve
```

```sh
# Compiles and minifies for production
npm run build
```

```sh
# Run your unit tests
npm run test:unit
```

```sh
# Run your end-to-end tests
npm run test:e2e
```

```sh
# Lints and fixes files
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
