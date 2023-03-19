import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import { morganMiddleware as Morgan } from './src/middlewares/MorganMiddleware';
import { exceptionHandler } from './src/middlewares/ExceptionHandler';
import { AppV1 } from './src/routers/v1';
import Constanta from './src/utils/Constanta';

const appV1 = new AppV1()
appV1.routes()


class App { 
    public app: Application;
    private environment;
    constructor() {
        this.environment = Constanta.NODE_ENV
        this.app = express()

        this.plugins()
        this.routes()
        dotenv()
    }

    protected plugins(): void {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(Morgan);
        this.app.use(cors());

        BigInt.prototype['toJSON'] = function () {
            return this.toString();
        };
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send({
              status: 'OK',
              message: 'Success',
              timestamp: new Date(),
              unixTimestamp: Math.round(new Date().getTime() / 1000),
            });
          });
      
        this.app.use('/api/v1', appV1.router)
        this.app.use(exceptionHandler)
    }
}

const port: number = Number(process.env.APP_PORT);
const app = new App().app;
app.listen(port);
console.log(`Listening on port ${port}`);