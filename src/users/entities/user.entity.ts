import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

// type UserRole = 'client' | 'owner' | 'delivery';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPasswords(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      // before going to the database going to hash it.
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
      // this we are going to caching that there.
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      // const ok = await bcrypt.compare(aPassword, this.password);
      // return ok;
      return bcrypt.compare(aPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
