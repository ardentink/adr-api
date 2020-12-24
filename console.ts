import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'

import Repl from 'repl'
import { User, Organization, Membership } from './src/entity'

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

;(async () => {
  clear()
  console.log(
    '👋 Welcome to the ADR console. Type ".help" for more information.'
  )
  console.log('🔍 Connecting to DB...')
  await createConnection()
  const userRepository = getRepository(User)
  const organizationRepository = getRepository(Organization)
  const membershipRepository = getRepository(Membership)
  console.log('🔗 Connected!')

  const context = Repl.start('\x1b[32madr ➜\x1b[0m ').context
  context.User = getRepository(User)
  context.Organization = getRepository(Organization)
  context.Membership = getRepository(Membership)
})()
