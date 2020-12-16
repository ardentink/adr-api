import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { User } from '../entity/User'

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  createUser(
    @Arg('email') email: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string
  ) {
    const user = new User()
    user.email = email
    user.firstName = firstName
    user.lastName = lastName
    return user
  }

  @Query(() => [User])
  users() {
    return [new User(1, 'SOME_UUID', 'Example', 'User', 'somebody@example.com')]
  }
}
