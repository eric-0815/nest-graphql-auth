import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  password: string;
}
