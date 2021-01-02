import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import Mailgun from 'mailgun-js'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import resolvers from './resolvers'
import { User } from './entities'
import { authChecker } from './auth'

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_KEY as string,
  domain: process.env.MAILGUN_DOMAIN as string
})

export interface Context {
  req: Express.Request
  res: Express.Response
  user?: User
  mailer: Mailgun.Messages
}

/**
 * Extracts the raw token from an authorization header if provided.
 * @param tokenString A string containing the authorization scheme name and the
 *   actual token. e.g. `Bearer $3CR3T_T0K3N`
 */
function extractToken(tokenString: string | undefined): string | undefined {
  if (!tokenString) {
    return undefined
  }
  const [scheme, token] = tokenString.trim().split(/\s+/)
  return token
}

;(async () => {
  await createConnection()

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers, authChecker }),
    context: async ({ req, res }) => {
      const token = extractToken(req.headers.authorization)
      const user = token ? await User.findOne({ authToken: token }) : undefined
      const context: Context = {
        req,
        res,
        user,
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
