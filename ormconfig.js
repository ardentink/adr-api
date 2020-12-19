let folder, extension, ssl

switch (process.env.TYPEORM_DIR) {
  case 'dist':
    folder = 'dist'
    extension = 'js'
    ssl = true
    break
  case 'src':
  default:
    folder = 'src'
    extension = 'ts'
    ssl = false
    break
}

console.log(`TypeORM configured to use ${folder} directory`)

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  extra: { ssl },
  entities: [`${folder}/entity/**/*.${extension}`],
  migrations: [`${folder}/migration/**/*.${extension}`],
  subscribers: [`${folder}/subscriber/**/*.${extension}`],
  cli: {
    entitiesDir: `${folder}/entity`,
    migrationsDir: `${folder}/migration`,
    subscribersDir: `${folder}/subscriber`
  }
}
