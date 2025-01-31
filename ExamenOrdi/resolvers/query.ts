import { RestaurantModel } from "../db/restaurant.ts";
import { getCityTime, getCityWeather } from "../lib/apifunctions.ts";

export const Query = {
    getRestaurant: async(_: unknown, args: { id: string}) => {
        const restaurant = await RestaurantModel.findById(args.id);
        if(!restaurant) throw new Error("Restaurant not found");

        const temperature = await getCityWeather(restaurant.city);
        const localTime = await getCityTime(restaurant.city);

        return {
            ...restaurant.toObject(),
            temperature,
            localTime,
        };
    },

    getRestaurants: async (_: unknown, args: { city?: string}) => {
        const query = args.city ?
        { city: args.city} : {};
        return await RestaurantModel.find(query);
    },
};