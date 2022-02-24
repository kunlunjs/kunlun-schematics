import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from './auth.service'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LoginInput } from './dto/login.input'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RefreshTokenInput } from './dto/refresh-token.input'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SignupInput } from './dto/signup.input'
import { AuthModel } from './models/auth.model'
import { TokenModel } from './models/token.model'

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase()
    const { accessToken, refreshToken } = await this.authService.createUser(
      data
    )
    return {
      accessToken,
      refreshToken
    }
  }

  @Mutation(() => AuthModel)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login(
      email.toLowerCase(),
      password
    )

    return {
      accessToken,
      refreshToken
    }
  }

  @Mutation(() => TokenModel)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token)
  }

  @ResolveField('user')
  async user(@Parent() auth: AuthModel) {
    return await this.authService.getUserFromToken(auth.accessToken)
  }
}
