import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '.'

@ObjectType()
@Entity()
@Index(['user', 'slug'], { unique: true })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(type => ID, { name: 'id' })
  @Column({ unique: true })
  @Generated('uuid')
  uuid!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  slug!: string

  @ManyToOne(
    type => User,
    user => user.projects
  )
  user!: User
  // TODO: I want projects to belong to users OR organizations, but polymorphic
  // types are complicated. So I'm just supporting users for now. In the future
  // this should either be changed to ownerType and ownerId, both not NULL, or
  // have a userId and organizationId, both NULLable (but one is required).
}
