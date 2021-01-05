import { Entity } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from '.'

@Entity()
@ObjectType()
export class UserWithAuthToken extends User {
  @Field()
  authToken!: string
}
