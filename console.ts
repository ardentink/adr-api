import 'reflect-metadata'
import Mailgun from 'mailgun-js'
import { createConnection, getRepository } from 'typeorm'
import Repl from 'repl'
import { v4 } from 'uuid'
import * as entities from './src/entities'

const mailgun = Mailgun({
  apiKey: process.env.MAILGUN_KEY as string,
  domain: process.env.MAILGUN_DOMAIN as string
})

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

;(async () => {
  await createConnection()

  clear()
  const prompt = 'adr ➜'
  const context = Repl.start(`\x1b[32m${prompt}\x1b[0m `).context
  Object.entries(entities).forEach(([name, entity]) => {
    context[name] = {
      get all() {
        return getRepository(entity).find()
      },
      get new() {
        return new entity()
      }
    }
  })
  context.Mailer = mailgun.messages()
  context.Uuid = v4
})()
