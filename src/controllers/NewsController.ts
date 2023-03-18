import { ControllerBase } from './ControllerBase';
import { Request, Response, NextFunction } from 'express';

export class NewsController extends ControllerBase {
    constructor() {
        super()
    }

    request = async (req: Request, res: Response, next: NextFunction) => {
        try{
            return this.ok(res, "hai")
        } catch (error) {
            next(error)
        }
        
    }
}