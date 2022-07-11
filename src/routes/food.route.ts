import { Router } from 'express';
import {createFood, deleteFood, getAllFood, getFood, getFoodByUserId, updateFood} from '../controllers/food.controller';
import {headerToken} from "../middlewares/verifyToken.middleware";
import {isUserAdmin} from "../middlewares/verifyUser.middleware";

const foodRoute = () => {
    const router = Router();

    router.post('/food', headerToken, createFood);

    router.get('/food', headerToken, isUserAdmin, getAllFood);

    // router.get('/food/:id', headerToken, isUserAdmin, getFood);

    router.get('/food/me', headerToken, getFoodByUserId);

    router.patch('/food/:id', headerToken, isUserAdmin, updateFood);

    router.delete('/food/:id', headerToken, isUserAdmin, deleteFood);

    return router;
};

export { foodRoute };
