// update Restaurant is parial type all the type but they are optional

import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
// here i am not going to use Restaurant coz restaurant id is required y using createRestaurantDto.
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

// @ArgsType()
@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
