import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

// @InputType() return one object
// @ArgsType() // pass as an arguments
@InputType()
// export class CreateRestaurantDto {
// @Field((type) => String)
// @IsString()
// @Length(5, 10)
// name: string;

// @Field((type) => Boolean)
// @IsBoolean()
// isVegan: boolean;

// @Field((type) => String)
// @IsString()
// address: string;

// @Field((type) => String)
// @IsString()
// ownersName: string;
// delete all this because we want to extend everything from restaurants except id.

// }
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'],
  // InputType, // 2 options to specify inputtype
) {}
