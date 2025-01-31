import mongoose from "mongoose";

const schema = mongoose.Schema;

const RestaurantSchema = new schema ({
    name : { type : String, required: true, unique: true},
    address: { type : String, required: true},
    city: { type: String, required: true},
    phone: { type: String, required: true, unique: true},
});

export const RestaurantModel = mongoose.model ("Restaurant", RestaurantSchema);