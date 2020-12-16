import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  id!: number

  @Field(() => ID, { name: 'id' })
  uuid!: string

  @Field()
  firstName!: string

  @Field()
  lastName!: string

  @Field()
  email!: string

  constructor(
    id?: number,
    uuid?: string,
    firstName?: string,
    lastName?: string,
    email?: string
  ) {
    this.id = id || 1
    this.uuid = uuid || 'RANDOM_UUID'
    this.firstName = firstName || 'FirstName'
    this.lastName = lastName || 'LastName'
    this.email = email || 'bob@example.com'
  }
}
