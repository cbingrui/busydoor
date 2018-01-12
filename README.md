[![busydoor.net Logo](http://busydoor.net/favicon.png)](http://busydoor.net/)

# Busydoor

### [Demo](http://busydoor.net)

busydoor.net is a `MEAN` Stack based website which with `MongoDB v3.4.9`, `Express 4.11`, `Angular 5.1.2` and `NodeJs 8.9.3`. `Bootstrap4` included.

It's a project for our better understanding about the basic idea and knowledge of MEAN Full Stack Development with Typescript.

### Account

Use Admin role account so you are able to perform more operations when testing, such as delete and post new article:

Email: 'admin@busydoor.net' , Password: 'admin'

用'admin@busydoor.net'(账号)与 'admin'(密码)可作管理员登录进行更多操作。

## Features

* Account: Login, Register, Find and Reset password.
* Responsived and mobile consider.
* Security. JWT, Backend validation (limitted)

### A little thing

Admin role. @media print for CV. Animation. Server/Client interface consistent with typings.d.ts file.

## Development server

(OSX)

### Installation

git clone --depth 1 https://github.com/cbingrui/busydoor.git  
cd busydoor  
yarn install  
cd server  
yarn install

### Admin role

For now we need to execut the mongo command manually for additional operations such as 'new post'. (only can assign the `Admin` role to existing account because password was parsed by `bcryptjs` before saving)  
`db.getCollection("users").update({ email: 'admin@busydoor.net' }, { $set: { "role":'Admin'} })`

### Mongo

Run `sudo mongo` for mongodb.

### Server

Run `npm run devserver` for a backend server.

### Client

Run `ng serve`(or npm run devclient with hmr) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Alternative `npm run prodbuild`.

## Running unit tests & Running end-to-end tests

Definitely essential and was supposed be TDD. Anyway testing is considering in blueprint.
