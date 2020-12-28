import { NonEmptyArray } from 'type-graphql'
import { default as UserResolver } from './UserResolver'

export default [UserResolver] as NonEmptyArray<Function>
