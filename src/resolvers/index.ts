import { NonEmptyArray } from 'type-graphql'
import { default as UserResolver } from './UserResolver'
import { default as AuthResolver } from './AuthResolver'

export default [UserResolver, AuthResolver] as NonEmptyArray<Function>
