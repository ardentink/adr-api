import { Resolver, Ctx, Query, Authorized, Mutation, Arg } from 'type-graphql'
import { Project } from '../entities'
import { Context } from '../index'

@Resolver()
export default class UserResolver {
  @Authorized()
  @Query(() => [Project])
  async projects(@Ctx() context: Context) {
    return context.user!.projects
  }

  @Authorized()
  @Mutation(type => Boolean)
  async createProject(
    @Arg('name') name: string,
    @Arg('slug') slug: string,
    @Ctx() context: Context
  ) {
    const user = context.user!

    const project = new Project()
    project.name = name
    project.slug = slug
    await project.save()
    return project
  }
}
