# `sw-planets`

Single page application with a list of characters from Star Wars and details about their related
home planet. The list of characters and the information related to the planets can be
accessed using the swapi api: **SWAPI api details**: https://swapi.dev/

**sw-planets Demo page: https://m-jerez.github.io/sw-planets/**

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

&nbsp;

[![demo](./public/demo.png??raw=true)](https://m-jerez.github.io/sw-planets/)

&nbsp;&nbsp;&nbsp;&nbsp;

### `Stack`

| Name                                                                          | Description                                 |
| ----------------------------------------------------------------------------- | ------------------------------------------- |
| [Vue.js](https://vuejs.org/)                                                  | frontend framework                          |
| [Typescript](https://www.typescriptlang.org/)                                 | Static typed language on top of JS          |
| [Vuex](https://vuex.vuejs.org/)                                               | state management system for vue             |
| [vuex-persisted-state](https://github.com/robinvdvleuten/vuex-persistedstate) | persistence plugin fo vuex _(page-reloads)_ |

&nbsp;&nbsp;&nbsp;&nbsp;

### `SWAPI limitations`

The [SWAPI](https://swapi.dev/documentation) returns all collections `paginated` ( `https://swapi.dev/api/people/?page=1` ). It is not possible to change the size of the page and does not support `orderBy` queries.

Due to the requirement for users being able to sort by columns and the relatively small size of the Api. **The adopted approach is to download the full collection from the api and do the ordering in the browser. Otherwise the data displayed would be inconsistent** as the ordering would be only done on the "partial collection" in the browser and not into the full collection from the Api.

For a large Api, and to be able to order, the Api must support both the `orderBy` and `Pagination` operations.

&nbsp;&nbsp;&nbsp;&nbsp;

### `Possible Vuex Optimizations`

At the moment all the data is loading during the app initialization which might cause slow page loads. [vuex-persisted-state](https://github.com/robinvdvleuten/vuex-persistedstate) is used to mitigate this problem. (A reload button has been added to let the user reload data if required)

Another possible strategy would be to load only the data for the page displayed in the ui ( pagination component still pending to implement), but as mentioned this would also require the api to support orderby and filter operations.

&nbsp;&nbsp;&nbsp;&nbsp;

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
