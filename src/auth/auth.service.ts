import { Injectable } from '@nestjs/common';
import { LoginUserInput } from 'src/users/dto/user-login.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
      access_token: 'jwt',
      user: result,
    };
  }
}
