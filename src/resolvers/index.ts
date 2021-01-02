import { NonEmptyArray } from 'type-graphql'
import { default as AuthResolver } from './AuthResolver'
import { default as ProjectsResolver } from './ProjectsResolver'
import { default as UserResolver } from './UserResolver'

export default [AuthResolver, ProjectsResolver, UserResolver] as NonEmptyArray<
  Function
>
