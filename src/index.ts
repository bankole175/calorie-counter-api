import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import {json, urlencoded} from "body-parser";
import {foodRoute} from "./routes/food.route";
import cors from 'cors'


dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

app.use(
    json(),
    urlencoded({
        extended: true
    })
);

// catch 404 and forward to error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    err.status = 404;
    next(err);
});

app.use('/v1', foodRoute());

// @ts-ignore
const dbUrl: string = process.env.MONGODB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to database');
});


const port = process.env.PORT

// app.get('/', (req: express.Request, res: { send: (arg0: string) => void; }) => {
//     res.send('Welcome to calorie counter app ⚡ ⚡ ⚡');
// });

app.listen(port, async () => {
    await
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
