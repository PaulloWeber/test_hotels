import { createConnection } from 'typeorm'

const entities =
  process.env.NODE_ENV == 'dev'
    ? './src/domain/models/**/*.ts'
    : './dist/domain/models/**/*.js'

const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbDatabase = process.env.DB_DATABASE
const dbUrl = process.env.DB_URL

createConnection({
  type: 'mongodb',
  url:
    'mongodb+srv://' +
    dbUserName +
    ':' +
    dbPassword +
    dbUrl +
    dbDatabase +
    '?retryWrites=true&w=majority',
  useNewUrlParser: true,
  database: dbDatabase,
  entities: [entities],
  synchronize: true,
  useUnifiedTopology: true,
  logging: true,
})
  .then((connection) => {
    console.log({ ...connection.options, username: '***', password: '***' })
    console.log('Database conectado!')
  })
  .catch((error) => console.log(error))
