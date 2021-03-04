# glimesh

![npm](https://img.shields.io/npm/v/glimesh)
![npm bundle size](https://img.shields.io/bundlephobia/min/glimesh)
![npm](https://img.shields.io/npm/dt/glimesh)
![NPM](https://img.shields.io/npm/l/glimesh)

> Simplifies interacting with Glimesh's API using TypeScript

This package makes it easier to work with the [Glimesh API](https://github.com/Glimesh/glimesh.tv/wiki/GraphQL-API) using [TypeScript](http://www.typescriptlang.org/). Inspired by the popular [twitch](https://www.npmjs.com/package/twitch) package, I created an interface for [Glimesh](https://www.streamloots.com/).

> Disclaimer: This is not an official supported by Glimesh! This is more of a clever workaround to make your life easier.

## Examples

Get User by ID...
```js
let authProvider = new ClientCredentialsAuthProvider("Your-Client-ID", "Your-Client-Secret");
let client = new ApiClient({ authProvider });

client.users.getUserById(2299)
    .then(user => {
        console.log(`With id => ID: ${user?.id}, Name: ${user?.username}`);
    })
    .catch(err => {
        console.log(err);
    });
```

Get Category by slug...
```js
let authProvider = new ClientCredentialsAuthProvider("Your-Client-ID", "Your-Client-Secret");
let client = new ApiClient({ authProvider });

client.categories.getCategoryBySlug("tech")
    .then(category => {
        console.log(`With slug => ID: ${category?.id}, Name: ${category?.name}`);
    })
    .catch(err => {
        console.log(err);
    });
```

Get Channel by username...
```js
let authProvider = new ClientCredentialsAuthProvider("Your-Client-ID", "Your-Client-Secret");
let client = new ApiClient({ authProvider });

client.channels.getChannelByName("D4ddyLiLd4rk")
    .then(channel => {
        console.log(`With id => ID: ${channel?.id}, Streamer: ${channel?.streamer?.username}`);
    })
    .catch(err => {
        console.log(err);
    });

## Getting Started

Make sure you're running Node v4 and TypeScript 1.7 or higher...
```
$ node -v
v12.18.4
$ npm install -g typescript tsd
$ tsc -v
Version 4.2.2
```

Install the *glimesh* package and the typings definitions for Node.js...
```
$ npm install glimesh
$ tsd install node
```

Write some code...
```js


```

Save the above to a file (index.ts), build and run it!
```
$ tsc index.ts typings/node/node.d.ts --target es6 --module commonjs
$ node index.js
<!doctype html><html ...
```

To use the sample with your own account, do the following steps:

* Head over to Glimesh: https://glimesh.tv/

* Go to Settings

  ![Settings](https://i.imgur.com/ORhbTwu.png)

* Go to Applications

  ![Applications](https://i.imgur.com/5csFYcj.png)

* Create a new Application or use an existing

  ![Choose Application](https://i.imgur.com/inLBaLI.png)

* Copy your Client ID and Secret. DISCLAIMER: Do not share these with anyone!  

  ![Copy Tokens](https://i.imgur.com/vSwXiRX.png)

Special Thanks to [the Devs of the Twitch Package](https://d-fischer.github.io/twitch/) for their inspirational code over on GitHub.