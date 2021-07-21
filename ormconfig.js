const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbDatabase = process.env.DB_DATABASE
const dbUrl = process.env.DB_URL

module.exports = {
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
  synchronize: true,
  logging: true,
  entities: ['src/domain/models/**/*.ts'],
  migrations: ['src/infra/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: ['src/infra/database/migrations/'],
    entitiesDir: 'src/domain/models',
  },
}
