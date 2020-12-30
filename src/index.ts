import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import Mailgun from 'mailgun-js'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import resolvers from './resolvers'

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_KEY as string,
  domain: process.env.MAILGUN_DOMAIN as string
})

export interface Context {
  req: Express.Request
  res: Express.Response
  mailer: Mailgun.Messages
}

;(async () => {
  await createConnection()

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers }),
    context: ({ req, res }) => {
      const context: Context = {
        req,
        res,
        mailer: mailgun.messages()
      }
      return context
    }
  })

  const port = process.env.APP_PORT || 4000

  server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})()
