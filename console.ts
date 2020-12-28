import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'

import Repl from 'repl'
import { User, Organization, Membership, Project } from './src/entity'

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f')
}

;(async () => {
  await createConnection()
  const userRepository = getRepository(User)
  const organizationRepository = getRepository(Organization)
  const membershipRepository = getRepository(Membership)
  const projectRepository = getRepository(Project)

  clear()
  const prompt = 'adr ➜'
  const context = Repl.start(`\x1b[32m${prompt}\x1b[0m `).context
  context.User = getRepository(User)
  context.Organization = getRepository(Organization)
  context.Membership = getRepository(Membership)
  context.Project = getRepository(Project)
})()
