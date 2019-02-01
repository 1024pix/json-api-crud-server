# JSON:API CRUD Server

The goal of this project if to use Fortune.js in order to make a _productive_ JSON:API compliant CRUD API for an Ember.js / Ember Data front-end application.

> Fortune.js is a non-native graph database abstraction layer for Node.js and web browsers. 

By default, Fortune.js is set upfront to a single or multiple database(s).

In our case, we will use only one DB - PostgreSQL - with the dependency `fortune-postgres`.

Fortune.js also offers an interesting mechanism of _plugins_ to improve its integration in other parts: networking, serialization, adapters, etc.

In our case, we want to have a Web server that automatically exposes routes based on defined record types. So we use `fortune-http`.

Moreover, we want the requests & responses to follow JSON:API format. Lucky us, there is another cool plugin we can use: `fortune-json-api`.


## Prerequesites

* Node (v8.11+)
* npm (v5.6+)
* Docker (v2.0+)
 
 
## Getting Started

```bash
$ git clone git@github.com:1024pix/json-api-crud-server.git
$ cd json-api-crud-server
$ npm install
$ npm start
$ curl http://localhost:3000
```


## Basic usage

Declaring and exposing a resource is as simple as adding a new file in `./lib/models`.

````javascript
// lib/models/user.js

module.exports = {

  tableName: 'users',

  recordTypes: {
    // Attributes
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,

    // Relationships
    memberships: [Array('membership'), 'user'],
  }

};
````

Results:

<img src="/doc/img/GET_users.png" width="600">

## Project anatomy

```
config                   → Configurations files and other non-transpiled resources
 └ environment.js        → Main configuration file for each environment 
lib                      → Application sources
 └ models                → Application models definition (record types, hooks, table name, etc.)
 └ options.js            → Server settings and models-based configuration loading
 └ server.js             → Service instance
index.js                → Node.js launcher
```


## Resources

### Type definition (required)

> The only required input of Fortune.js are record types, which are analogous to a struct in C-like languages. Record types guarantee that fields must belong to a single type or that they are links. The valid types are native JavaScript types including Buffer from Node.js, and custom types may extend one of the native types. A link must refer to an ID belonging to a single record type. Both types and links may be defined as arrays or singular values.

More information on [the corresponding section on the Fortune.js website](http://fortune.js.org/guide/#type-definition).

### Table name (optional)

By default, the name of the table mapped to the resource is its camel-cased name.

Define `tableName` to specify a different table name.

### Input and Output Hooks (optional)

> Input and output hooks are user-defined functions which are run before writing a record, and after reading a record.

More information on [the corresponding section on the Fortune.js website](http://fortune.js.org/guide/#input-and-output-hooks).


## Routing

Routes and endpoints are automatically generated from your models definition.

If needed, you can add or override a route by defining it in `lib/server.js`, juste before adding Fortune HTTP listener to Express.

````javascript
const server = express();

// Define your custom or overridden routes here
server.get('/users', (req, res) => {
  res.send('My custom GET /users route');
});

// Make sure that the Fortune listener is last in the middleware stack,
// since it ends the response by default (this can be optionally disabled).
server.use((request, response) =>
  listener(request, response)
    .catch((error) => {
      console.error(error.stack)
    }));
````

## Database configuration

By default, Fortune.js use an in-memory database. 

You can easily use a local PostgreSQL database with Docker (v2.0+):

1/ Run a PostgreSQL image-based Docker container

```bash
docker run --rm -e POSTGRES_DB=api-db -dit -p 5432:5432 postgres
```

2/ Create a `.env` file (dotenv library is included and loaded by default) with the following environment variable definition:

```
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/api-db
```

3/ Start the application

```bash
npm start
```


## ⚠ Important!

**According to the JSON:API specs, all requests must have define the header `Content-Type` with value `application/vnd.api+json`.** 


## Links

* [Fortune.js](http://fortune.js.org)
* [fortune-http](https://github.com/fortunejs/fortune-http)
* [fortune-postgres](https://github.com/fortunejs/fortune-postgres)
* [fortune-json-api](https://github.com/fortunejs/fortune-json-api)
* [JSON:API specs](https://jsonapi.org/)