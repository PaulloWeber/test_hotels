## Starting

Below are described the commands to build the application and run on your machine.

### Use

* [DOCKER](https://docs.docker.com/install/)
* [NPM](https://www.npmjs.com/)
* [NODE](https://nodejs.org/en/)

### Executing

First rename file .env.example to .env

Install dependencies:

```bash

npm install --save

```

Output:

```bash

add x packages

```

Build project, first execute:

```bash

npm run build

```

Output:

```bash

add x packages

```

Docker build:

```bash

docker build . -t tui_test

```

Output:

```bash

Successfully tagged tui_test:latest

```

Run project:

```bash

docker run -p 8181:3332 tui_test

```

Output:

```bash

Servidor de produção ativo em http://localhost...

```

### Endpoints tests

Get All Hotels:

http://localhost:8181/api/hotel/

example: http://localhost:8181/api/hotel/?page=1&pageSize=2&countryCode=BR

optional params:

    page: number -> number of page,

    pageSize: number -> quantity per page,

    name: string,

    address: string,

    code: string -> code of hotel (example: RTMADPUL, RTRIODUM),

    cityCode: string -> code of city (example: PAR, LIS, RIO, MAD),

    countryCode: string -> code of country (example: BR, PT, FR, ES)


Get Hotel By Id:
http://localhost:8181/api/hotel/{code}

code examples: RTMADPUL, RTRIODUM, HIPARC12 (others can be found in get all)


