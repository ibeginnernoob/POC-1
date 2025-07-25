import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import AuthRuter from './routers/auth';
import SnagRouter from './routers/snag';
import isAuth from './middleware/isAuth';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '');
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json({
        msg: 'Hello World!',
    });
});

app.use('/auth', AuthRuter);
app.use('/snag', isAuth, SnagRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
