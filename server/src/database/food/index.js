import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isVeg: { type: Boolean, required: true },
        isContainsEggs: { type: Boolean, required: true },
        category: { type: String, required: true },
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "images"
        },
        price: { type: Number, default: 150, required: true },
        addOns: [
            {
                type: mongoose.Types.ObjectId,
                ref: "foods",
            },
        ],
        retaurant: {
            type: mongoose.Types.ObjectId,
            ref: "restaurants",
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const FoodModel = mongoose.model("foods", FoodSchema);