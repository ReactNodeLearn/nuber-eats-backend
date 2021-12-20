import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    // console.log(veganOnly);
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    // @Args('name') name: string,
    // @Args('isVegan') isVegan: string,
    // @Args('address') address: string,
    // @Args('ownersName') ownersName: string,
    // we can't create input type basically allows u whole objects instead of
    // @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
    @Args('input') createRestaurantDto: CreateRestaurantDto,
    // ): boolean {
  ): Promise<boolean> {
    console.log(createRestaurantDto);
    // return true;
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
