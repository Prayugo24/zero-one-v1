import { ControllerBase } from './ControllerBase';
import { Request, Response, NextFunction } from 'express';
import { INewsService } from '../services/contract';
import logger from '../utils/Logger';
import { NewsQueryParams } from '../models';

export class NewsController extends ControllerBase {
    private _newsService: INewsService;
    constructor(newsService: INewsService) {
        super()
        this._newsService = newsService;
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body
            const saveData = await this._newsService.save(data);
            logger.info({event: 'news_created', param: data})
            return this.ok(res, saveData);
        } catch (error) {
            logger.info({event: 'news_created_error', errors: error})
            next(error)
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { id } = req.params;
            const findData = await this._newsService.findById(parseInt(id));
            logger.info({event: 'get_news', param: id})
            return this.ok(res, findData);
        } catch (error) {
            logger.info({event: 'get_news_error', errors: error})
            next(error)
        }
    }

    findAll = async (req: Request<{}, {}, {}, NewsQueryParams>, res: Response, next: NextFunction) => {
        const query = req.query;
        try {
          const findData = await this._newsService.findAll(query);
          logger.info({event: 'get_news_all', param: findData})
          return this.ok(res, findData);
        } catch (error) {
          logger.info({event: 'get_news_all_error', errors: error})
          next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const { id } = req.params;
            const data = req.body;
            const updateData = await this._newsService.update(parseInt(id), data)
            logger.info({event: 'news_updated', param: data})
            return this.ok(res, updateData);
        } catch (error) {
            logger.info({event: 'news_update_error', errors: error})
            next(error)
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {  
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updateData = await this._newsService.updateStatus(parseInt(id), status)
            logger.info({event: 'news_updated_status', param: status})
            return this.ok(res, updateData);
        } catch (error) { 
            logger.info({event: 'news_update_status_error', errors: error})
            next(error)
        }
    }
}