import { ControllerBase } from "./ControllerBase";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/Logger";
import { ITopicService } from "../services/contract";
import { TopicQueryParams } from "../models";

export class TopicController extends ControllerBase {
    private _topicService: ITopicService;

    constructor(topicService: ITopicService) {
        super()
        this._topicService = topicService
    }
    save = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = req.body
            const saveData = await this._topicService.save(data);
            logger.info({event: 'topic_created', param: data})
            return this.ok(res, saveData);
        } catch (error) {
            logger.info({event: 'topic_created_error', errors: error})
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const { id } = req.params;
            const data = req.body;
            const updateData = await this._topicService.update(parseInt(id), data)
            logger.info({event: 'topic_updated', param: data})
            return this.ok(res, updateData);
        } catch (error) {
            logger.info({event: 'topic_update_error', errors: error})
            next(error)
        }
    }

    findByid = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { id } = req.params;
            const findData = await this._topicService.findById(parseInt(id));
            logger.info({event: 'get_topic', param: findData})
            return this.ok(res, findData);
        } catch (error) {
            logger.info({event: 'get_topic_error', errors: error})
            next(error)
        }
    }

    findAll = async (req: Request<{}, {}, {}, TopicQueryParams>, res: Response, next: NextFunction) => {
        const query = req.query;
        try {
          const findData = await this._topicService.findAll(query);
          logger.info({event: 'get_topic_all', param: findData})
          return this.ok(res, findData);
        } catch (error) {
          logger.info({event: 'get_topic_all_error', errors: error})
          next(error);
        }
    }

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { id } = req.params;
            const findData = await this._topicService.deleteById(parseInt(id));
            logger.info({event: 'delete_topic', param: findData})
            return this.ok(res, findData);
        } catch (error) {
            logger.info({event: 'delete_topic_error', errors: error})
            next(error)
        }
    }
}
