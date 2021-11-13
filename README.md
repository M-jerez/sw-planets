# `sw-planets`
Single page application with a list of people and the details about their related
home planet. The list of people and the information related to a planet can be
accessed using the swapi api:

__SWAPI api details__: https://swapi.dev/

&nbsp;

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

### `Stack`
| Name | Description |
| ---- | ----------- |
| [Vue.js](https://vuejs.org/) | frontend framework |
| [Typescript](https://www.typescriptlang.org/) | Static typed language on top of JS |
| [Vuex](https://vuex.vuejs.org/) | state management system for vue |
| [vuex-cache](https://github.com/superwf/vuex-cache) | cache plugin for vuex |
| [vuex-persisted-state](https://github.com/robinvdvleuten/vuex-persistedstate) | persistence plugin fo vuex _(page-reloads)_ |

&nbsp;

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
