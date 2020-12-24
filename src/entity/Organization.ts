import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Membership } from './Membership'

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => ID, { name: 'id' })
  @Column({ unique: true })
  @Generated('uuid')
  uuid!: string

  @Field()
  @Column({ unique: true })
  slug!: string

  @Field()
  @Column()
  name!: string

  @Field(type => Membership)
  @OneToMany(
    type => Membership,
    membership => membership.organization
  )
  memberships!: Membership[]
}
