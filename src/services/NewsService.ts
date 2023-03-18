import { INewsService } from "./contract";
import { INewsRepository } from "../repositories/contract";
import { NewsRequest, News } from "../models";



export class NewsService implements INewsService {
    private _newsRepository: INewsRepository

    constructor(newsRepository: INewsRepository) {
        this._newsRepository = newsRepository
    }

    save = async(data:NewsRequest): Promise<News> => {
        const saveData = await this._newsRepository.save(data)
        return saveData;
    }

    findById = async(id: number): Promise<News | null> => {
        const getData = await this._newsRepository.findById(id);
        return getData;
    }

}