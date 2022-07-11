import {Router} from "express";
import { Request, Response } from 'express';
import {foodRoute} from "./food.route";


const router = Router();
// router.use('/', (req: Request, res: Response) => {
//     res.send('Welcome to calorie counter app ⚡ ⚡ ⚡');
//  })

router.use('/', foodRoute)



export {router}
