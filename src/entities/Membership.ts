import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Organization } from './Organization'
import { User } from './User'

@ObjectType()
@Entity()
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => ID, { name: 'id' })
  @Column({ unique: true })
  @Generated('uuid')
  uuid!: string

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.id
  )
  user!: User

  @Field(type => Organization)
  @ManyToOne(
    type => Organization,
    organization => organization.id
  )
  organization!: Organization

  @Field()
  @Column({ unique: true })
  role!: Membership.Role
}

export namespace Membership {
  export enum Role {
    Member = 'MEMBER',
    Owner = 'OWNER',
    Admin = 'ADMIN'
  }
}
