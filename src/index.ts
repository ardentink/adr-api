import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from './resolvers/UserResolver'
import { buildSchema } from 'type-graphql'
;(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res })
  })

  const port = process.env.PORT || 4000

  server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})()
