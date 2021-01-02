import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Membership, Project } from '.'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(type => ID, { name: 'id' })
  @Column({ unique: true })
  @Generated('uuid')
  uuid!: string

  @Field()
  @Column()
  firstName!: string

  @Field()
  @Column()
  lastName!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Field(type => Membership)
  @OneToMany(
    type => Membership,
    membership => membership.user
  )
  memberships!: Membership[]

  @Field(type => Project)
  @OneToMany(
    type => Project,
    project => project.user,
    { eager: true }
  )
  projects!: Project[]

  @Column({ unique: true, nullable: true })
  authToken!: string

  @Column()
  isAdmin!: Boolean
}
