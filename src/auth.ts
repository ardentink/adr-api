import { AuthChecker } from 'type-graphql'
import { Context } from './index'

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  if (!context.user) {
    // the user hasn't authenticated
    return false
  }

  if (!roles.length) {
    // we aren't scoping to a specific role
    return true
  }

  if (roles.includes('SUPER_ADMIN')) {
    return Boolean(context.user.isAdmin)
  }

  // TODO: Handle all the different roles that comes from the `@Authorized`
  // decorator, eg. ["ADMIN", "MODERATOR"]

  return true
}
