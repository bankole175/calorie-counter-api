import mongoose, { Schema, Model, Document } from 'mongoose';

type FoodDocument = Document & {
    userId: string;
    name: string;
    calorie: number;
    dateTime: string;
    price: number | 0;
};

type FoodInput = {
    userId: FoodDocument['id'];
    name: FoodDocument['name'];
    calorie: FoodDocument['calorie'],
    dateTime: FoodDocument['dateTime'],
    price: FoodDocument['price']
};

const foodSchema = new Schema(
    {
        userId: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        name: {
            type: Schema.Types.String,
            required: true,
        },
        calorie: {
            type: Schema.Types.Number,
            required: true,
        },
        dateTime: {
            type: Schema.Types.String,
            required: true,
        },
        price: {
            type: Schema.Types.Number,
            default: 0
        }
    },
    {
        collection: 'foods',
        timestamps: true,
    },
);

const Food: Model<FoodDocument> = mongoose.model<FoodDocument>('Food', foodSchema);

export { Food, FoodInput, FoodDocument };
