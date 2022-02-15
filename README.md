<p align="center">
  <a href="http://kunlunjs.cn/" target="blank"><img src="logo.png" width="600" alt="Kunlun Logo" /></a>
</p>

<p align="center">A <a href="http://nodejs.org" target="blank">fullstack(NestJS、React)</a> framework for building efficient and scalable applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/org/kunlunjs"><img src="https://img.shields.io/npm/v/@kunlunjs/schematics.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/org/kunlunjs"><img src="https://img.shields.io/npm/l/@kunlunjs/schematics.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/org/kunlunjs"><img src="https://img.shields.io/npm/dm/@kunlunjs/schematics.svg" alt="NPM Downloads" /></a>
  <a href="https://coveralls.io/github/turing-fe/kunlun-schematics?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/turing-fe/kunlun-schematics/badge.svg?branch=master#9" alt="Coverage" /></a>

## Description

The Kunlun CLI is a command-line interface tool that helps you to initialize, develop, and your Kunlun application.
It assists in multiple ways, including scaffolding the project, serving it in development mode, and building and bundling the application for production distribution.
It embodies best-practice architectural patterns to encourage well-structured app. Read more [here]().

## Installation

```bash
npm install -g @kunlunjs/schematics
# or
yarn global add @kunlunjs/schematics
```

## Usage

## Developing

Install `@angular-devkit/schematics-cli` to be able to use `schematics` command

```bash
npm i -g @angular-devkit/schematics-cli
# or
yarn global add @angular-devkit/schematics-cli
```

Now build the schematics and run the schematics.

```bash
npm run build

# --dry-run
schematics .:application

# execute schematics
schematics .:application --debug false
# or
schematics .:application --dry-run false
# or
schematics .:application --type nest-prisma-restful --dry-run false
```

## Helpful

Helpful article about [Custom Angular Schematics](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) which also applies to Kunlun.

## Stay in touch

- Website - [https://kunlunjs.cn]()

## License

Kunlun is [MIT licensed](LICENSE).
