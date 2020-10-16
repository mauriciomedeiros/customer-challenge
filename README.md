[![lang: Typescript](https://img.shields.io/badge/Language-Typescript-Blue.svg?style=flat-square)](https://www.typescriptlang.org)
[![Build Status](https://travis-ci.com/mauriciomedeiros/customer-challenge.svg?branch=master)](https://travis-ci.com/mauriciomedeiros/customer-challenge)

#  Projeto Customer Challenge.

Objetivo desse projeto é apenas para o teste da LuizaLabs
API para CRUD de clientes e adicionar produtos favoritos para o cliente.

## Pre requisitos
* [NodeJS](https://nodejs.org/download/release/latest-v12.x/)
* [NPM](https://www.npmjs.com/get-npm)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Redis](https://redis.io/)
* [MongoDB](https://www.mongodb.com/)

## Rodar a API dockerizado
``` console
$ docker-compose-up
```

## Rodar api local
Baixar as dependências
``` console
$ npm i
```

Rodar a aplicação
``` console
$ npm run dev
```

## Rodar os testes
Rodar os testes unitários
``` console
$ npm run test
```

Rodar cobertura testes
``` console
$ npm run test:coverage

```


## Documentação Swagger
Com a aplicação rodando acessar
``` console
http://localhost:5000/challenge/docs
```


## Incluir exemplo no Postman
* [Postman](https://www.getpostman.com/collections/48c6d9ab3d89cae89d4e)


## Melhorias que devem ser feitas
* Implementar Testes end2end
* Implementar Testes de integração
* Implementar Encapsulamento das mensagens de erros
* Implementar middleware com requestId
* Implementar um circuit breaker na integração com a API de produtos
