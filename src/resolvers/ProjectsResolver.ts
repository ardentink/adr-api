import { Resolver, Ctx, Query, Authorized } from 'type-graphql'
import { Project } from '../entities'
import { Context } from '../index'

@Resolver()
export default class UserResolver {
  @Authorized()
  @Query(() => [Project])
  async projects(@Ctx() context: Context) {
    return context.user!.projects
  }
}
