import { UserInputError } from 'apollo-server'
import Bcrypt from 'bcrypt'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '../index'
import { User, VerificationCode } from '../entities'

@Resolver()
export default class AuthResolver {
  @Mutation(() => Boolean)
  async sendAccountCreationEmail(
    @Arg('email') email: string,
    @Ctx() ctx: Context
  ) {
    // TODO: Validate and convert emails addresses to a canonical form
    // See https://github.com/afair/email_address.js

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new UserInputError('A user with that email already exists')
    }
    let verificationCode = await VerificationCode.findOne({ email })
    if (!verificationCode) {
      verificationCode = new VerificationCode()
      verificationCode.email = email
      await verificationCode.save()
    }

    const data = {
      from:
        'ADR Online <testing@sandboxc4236118f5e949bb9230684ec2050b92.mailgun.org>',
      to: email,
      subject: 'Confirm your account on ADR',
      text: `Thanks for signing up for ADR! Here's your verification code: ${verificationCode.uuid}`
    }

    await ctx.mailer.send(data)
    return true
  }

  @Mutation(() => User)
  async createAccount(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('verificationCode') verificationCode: string,
    @Arg('password') password: string
  ) {
    const code = await VerificationCode.findOne({ uuid: verificationCode })
    if (!code) {
      throw new UserInputError('Invalid verification code')
    }
    let user = await User.findOne({ email: code.email })
    if (user) {
      throw new UserInputError(
        'This email address has already been verified. Please sign in instead.'
      )
    }

    const hashedPassword = await Bcrypt.hash(password, 10)

    user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = code.email
    user.password = hashedPassword
    await user.save()
    await code.remove()
    return user
  }
}