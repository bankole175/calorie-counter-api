import { Request, Response } from 'express';
import {Food, FoodInput} from '../models/food.model';

type FoodDto = {
    id: string
    name: string;
    calorie: number,
    dateTime: string,
    price: number
};
const createFood = async (req: Request, res: Response) => {
    try {
        const { calorie, price, dateTime, name } = req.body;
        const { id } = req.headers;

        if (!id) return res.status(422).json({ message: 'id is required in headers' });

        const FoodInput: FoodInput = {
            userId: id,
            name,
            calorie,
            dateTime,
            price
        };

        const data = await Food.create(FoodInput);

        return res.status(201).json({message: 'Food added successfully', data});
    } catch (e) {
        return res.status(422).json({ message: 'The fields name, calorie and dateTime are required' });
    }

};

const getAllFood = async (req: Request, res: Response) => {
    const data = await Food.find().sort('-createdAt').exec();

    return res.status(200).json({message: 'Foods', data });
};

const getFood = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await Food.findOne({ _id: id });

    if (!data) {
        return res.status(404).json({ message: `Food with id "${id}" not found.` });
    }

    return res.status(200).json({ data });
};

const updateFood = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const { calorie, price, dateTime, name } = req.body;

        const food = await Food.findOne({ _id: id });

        if (!food) {
            return res.status(404).json({ message: `Food with id "${id}" not found.` });
        }

        await Food.updateOne({ _id: id }, { name, calorie, price, dateTime });

        const foodUpdated = await Food.findById(id, { name, calorie, price, dateTime });

        return res.status(200).json({ data: foodUpdated });
    } catch (e) {
        return res.status(422).json({ message: 'The fields name, calorie and dateTime are required' });
    }
};

const deleteFood = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Food.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Role deleted successfully.' });
};

const getFoodByUserId = async (req: Request, res: Response) => {
    const { id } = req.headers;

    if (!id) return res.status(400).json({ message: `User with id "${id}" not found.` });

    // @ts-ignore
    const data = await Food.find().where({'userId': {$eq: id}})
    const preparedData: FoodDto[] = []
    if (data.length) {
        data.forEach((food) => {
            preparedData.push({
                id: food._id,
                name: food.name,
                calorie: food.calorie,
                price: food.price,
                dateTime: food.dateTime
            })
        })
    }

    return res.status(200).json({ data: preparedData });
}

export { createFood, deleteFood, getAllFood, getFood, updateFood, getFoodByUserId };
