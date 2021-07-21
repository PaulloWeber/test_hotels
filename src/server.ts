import 'reflect-metadata'

import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { Application } from 'express'
import express from 'express'
import httpContext from 'express-http-context'
import { InversifyExpressServer } from 'inversify-express-utils'

import { container } from './main/inversify/inversify.config'

let pathEnv = ''
let nodeServer = ''
switch (process.env.NODE_ENV) {
  case 'test':
    pathEnv = '.env.test'
    nodeServer = 'teste'
    break
  case 'qa':
    pathEnv = '.env.qa'
    nodeServer = 'qualidade'
    break
  case 'production':
    pathEnv = '.env'
    nodeServer = 'produção'
    break
  default:
    pathEnv = '.env'
    nodeServer = 'desenvolvimento'
    process.env.NODE_ENV = 'dev'
    break
}

dotenv.config({ path: pathEnv })

process.env.TZ = 'America/Sao_Paulo'

import './infra/database/context/connection'

const router = express.Router({
  caseSensitive: false,
  mergeParams: false,
  strict: false,
})

const server = new InversifyExpressServer(container, router)
server.setConfig((application: Application) => {
  application.use(bodyParser.urlencoded({ extended: true }))
  application.use(bodyParser.json())
  application.set('case sensitive routing', false)
  application.use(cors())
  application.use(httpContext.middleware)
})

const port = process.env.PORT || 3333
const app = server.build()
app.listen(port, () => {
  console.log(`Servidor de ${nodeServer} ativo em http://localhost:${port}`)
})
