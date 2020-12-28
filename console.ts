import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import Repl from 'repl'
import * as entities from './src/entity'

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
})()
