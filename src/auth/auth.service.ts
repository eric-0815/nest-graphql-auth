import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { LoginUserInput } from 'src/users/dto/user-login.input';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    console.log('user: ', user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(userLoginInput: LoginUserInput) {
    const user = await this.usersService.findOne(userLoginInput.username);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }

  async signup(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOne(createUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.usersService.create({
      ...createUserInput,
      password,
    });
  }
}
