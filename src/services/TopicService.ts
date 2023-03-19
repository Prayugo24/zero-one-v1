import { ITopicService } from "./contract";
import { ITopicRepository } from "../repositories/contract";
import { Topics, TopicQueryParams } from "../models";
import { ApplicationException } from "../exceptions/ApplicationException";

export class TopicService implements ITopicService {
    private _topicRepository: ITopicRepository

    constructor(topicRepository: ITopicRepository) {
        this._topicRepository = topicRepository;
    }

    save = async(data: Topics): Promise<Topics> => {
        const checkName = await this._topicRepository.findByName(data.name)
        if(checkName) {
            throw new ApplicationException('Validation error', 'ValidationError', [
                {
                  param: 'name',
                  message: 'name topic sudah digunakan',
                },
            ]);
        }
        const saveData = await this._topicRepository.save(data)
        return saveData;
    }

    update = async (id:number, data:Topics): Promise<Topics> => {
        const getData = await this._topicRepository.findById(id);
        
        if (!getData) {
            throw new ApplicationException(`Topic id '${id}' not found`,'NotFoundError');
        }

        const updateData = await this._topicRepository.update(id, data)
        if (!updateData) {
            throw new ApplicationException("failed update data", "UnknownError")
        }
        return updateData
    }

    findById = async(id: number): Promise<Topics | null> => {
        const getData = await this._topicRepository.findById(id);
        if (!getData) {
            throw new ApplicationException(`Topic id '${id}' not found`,'NotFoundError');
        }
        return getData;
    }

    findAll = async(request: TopicQueryParams): Promise<Topics[]> => { 
        let whereParams = {
            start_index: request?.start_index,
            limit: request?.limit
        };
        const topics = await this._topicRepository.findAll(whereParams);
        if (topics.length === 0) {
            throw new ApplicationException(
              'There are no topics registered',
              'NotFoundError'
            );
        }
        return topics;
    }

    deleteById = async(id: number): Promise<boolean> => {
        if (!id) {
            throw new ApplicationException(`Id is required`, 'ValidationError');
        } 
        const getData = await this._topicRepository.findById(id);
        if (!getData) {
            throw new ApplicationException(`Topic id '${id}' not found`,'NotFoundError');
        }
        const deleteTopic = await this._topicRepository.deleteById(id)
        
        if (!deleteTopic) {
            throw new ApplicationException(`failed delete Topic id '${id}' `,'UnknownError');
        }

        return true
    }
    
}

