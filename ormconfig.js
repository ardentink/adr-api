let folder, extension, ssl

switch (process.env.TYPEORM_DIR) {
  case 'dist':
    folder = 'dist'
    extension = 'js'
    ssl = {
      rejectUnauthorized: false
      // Fixes this error:
      // Error during migration run:
      // Error: self signed certificate in certificate chain
      //     at TLSSocket.onConnectSecure (_tls_wrap.js:1502:34)
      //     at TLSSocket.emit (events.js:314:20)
      //     at TLSSocket._finishInit (_tls_wrap.js:937:8)
      //     at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:711:12) {
      //   code: 'SELF_SIGNED_CERT_IN_CHAIN'
      // }
      // TODO: probably shouldn't have this turned off but it's a quick
      // fix for now.
      // See https://github.com/typeorm/typeorm/issues/278
      // and https://github.com/brianc/node-postgres/issues/2009
    }
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
  entities: [`${folder}/entities/**/*.${extension}`],
  migrations: [`${folder}/migrations/**/*.${extension}`],
  subscribers: [`${folder}/subscribers/**/*.${extension}`],
  cli: {
    entitiesDir: `${folder}/entities`,
    migrationsDir: `${folder}/migrations`,
    subscribersDir: `${folder}/subscribers`
  }
}
