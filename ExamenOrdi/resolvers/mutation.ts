import { RestaurantModel } from "../db/restaurant.ts";
import { getCityWeather, getCityTime } from "../lib/apifunctions.ts";

export const Mutation = {
    addRestaurant: async (_: unknown, args: {
        name: string;
        address: string;
        city: string;
        phone: string;
    }) => {
        const existingPhone = await RestaurantModel.findOne({ phone: args.phone});
        if(existingPhone) throw new Error("Phone number already in use");

        //Crear y guardar un restaurante
        const restaurant = new RestaurantModel(args);
        await restaurant.save();

        const temperature = await getCityWeather(args.city);
        const localTime = await getCityTime(args.city);

        return {
            ...restaurant.toObject(),
            temperature,
            localTime,
        };
    },

        deleteRestaurant: async (_: unknown, args: { id: string}) => {
            const deleted = await RestaurantModel.findByIdAndDelete(args.id);
            return !!deleted;
        },

    
};