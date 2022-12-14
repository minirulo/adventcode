# Advent of Code

TypeScript Solutions for the awesome [Advent of Code](https://adventofcode.com/)

## Getting Started

### Dependencies

To run the application you may either
* Install [Node](https://nodejs.org/en/) globally
* Install [nodeenv](https://pypi.org/project/nodeenv/) which is a nice node virtual environment manager in [Python](https://www.python.org/)
    * Once you set it up, don't forget to activate the environment before start.

For the [GNU Make](https://www.gnu.org/software/make/) lovers, I have setup an easy to use `Makefile`.

### Build

#### Make

```
make build
```

#### Node

```
npm run build
```

### Executing the application

A simple [express](https://expressjs.com/) application server the entrypoints for each of the puzzles.

#### Make

```
make run
```

#### Node

```
npm run start
```

After that you can visit the [Open API](https://swagger.io/) file at http://localhost:8008/docs.

#### Make

```
make test
```

#### Node

```
npm run test
```

## Authors

Contributors names and contact info

Raúl Castro Estévez
[@minirulo](https://gihub.com/minirulo)
