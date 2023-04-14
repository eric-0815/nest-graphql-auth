import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/users/dto/user-login.input';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    console.log(loginUserInput);
    return this.authService.login(loginUserInput);
  }
}
