switch (process.env.NODE_ENV) {
  case 'production':
  case 'staging':
    folder = 'dist'
    extension = 'js'
    break
  case 'development':
  default:
    folder = 'src'
    extension = 'ts'
    break
}

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [`${folder}/entity/**/*.${extension}`],
  migrations: [`${folder}/migration/**/*.${extension}`],
  subscribers: [`${folder}/subscriber/**/*.${extension}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}
