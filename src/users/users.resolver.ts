import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dtos';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      // const { ok, error } = await this.usersService.createAccount(
      //   createAccountInput,
      // );
      // if (error) {
      //   return {
      //     ok: false,
      //     error,
      //   };
      // } replace all this
      // return {
      //   ok: true,
      // };
      // return {
      //   ok,
      //   error,
      // };
      return this.usersService.createAccount(createAccountInput);
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.usersService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

// hash the password in the database, u take the password, u pass that through a hash function, we don't know the password of the user, huge security risk of the save data in the database.
