import { Entity } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from '.'

@Entity()
@ObjectType()
export class UserWithAuthToken extends User {
  @Field(type => String, { nullable: true })
  authToken?: string
}
