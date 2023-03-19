import { INewsService } from "./contract";
import { INewsRepository, ITopicRepository } from "../repositories/contract";
import { News, NewsTopics, NewsQueryParams } from "../models";
import { ApplicationException } from "../exceptions/ApplicationException";

export class NewsService implements INewsService {
    private _newsRepository: INewsRepository
    private _topicRepository: ITopicRepository
    constructor(
        newsRepository: INewsRepository,
        topicRepository: ITopicRepository,
    ) {
        this._newsRepository = newsRepository
        this._topicRepository = topicRepository
    }

    
    findById = async(id: number): Promise<News | null> => {
        const getData = await this._newsRepository.findById(id);
        if(!getData) {
          throw new ApplicationException(
            `news id ${id} not found`,
            'NotFoundError'
          );
        }
        return getData;
    }

    findAll = async(request: NewsQueryParams): Promise<News[]> => { 
      let whereParams = {
          start_index: request?.start_index,
          limit: request?.limit,
          status: request?.status,
          topic: request?.topic
      };

      const newsData = await this._newsRepository.findAll(whereParams);
      if (newsData.length === 0) {
          throw new ApplicationException(
            'There are no news data registered',
            'NotFoundError'
          );
      }
      return newsData;
    }

    update = async (id:number, dataNews: News): Promise<News> => {
      let { topics_ids }: any = dataNews;
      topics_ids = [...new Set(topics_ids)];
      
      let finByIdTopic = await this._topicRepository.findNotExistIds(topics_ids)
      if (finByIdTopic.length > 0) {
          throw new ApplicationException(
            `topic id ${finByIdTopic} not found`,
            'NotFoundError'
          );
      }

      const allTopics = await this._topicRepository.findManyByIdList(topics_ids)
      const topicList = allTopics.map<any>(x => {
        let mapping: Omit<NewsTopics, "id"> = {
          topics_id: x.id,
          news_id: dataNews.id
        }
  
        return mapping
      })


      const updateData = await this._newsRepository.update(
        id, 
        dataNews,
        topicList
      )
      if (!updateData) {
          throw new ApplicationException("failed update data", "UnknownError")
      }
      return updateData
    }

    updateStatus = async (id:number, statusData: string): Promise<News> => {
        const updateData = await this._newsRepository.updateStatus(id, statusData)
        if (!updateData) {
            throw new ApplicationException("failed update status data", "UnknownError")
        }
        return updateData
    }

    save = async (dataNews: News): Promise<News> => {
        
        let { topics_ids }: any = dataNews;
        topics_ids = [...new Set(topics_ids)];
        
        let finByIdTopic = await this._topicRepository.findNotExistIds(topics_ids)
        if (finByIdTopic.length > 0) {
            throw new ApplicationException(
              `topic id ${finByIdTopic} not found`,
              'NotFoundError'
            );
        }
        
        const existingNews = await this._newsRepository.findByTitle(
            dataNews.title
        );
        if (existingNews) {
          throw new ApplicationException('Validation error', 'ValidationError', [
            {
              param: 'title',
              message: 'title news sudah digunakan',
            },
          ]);
        }
    
    
        const allTopics = await this._topicRepository.findManyByIdList(topics_ids)
    
        const topicList = allTopics.map<any>(x => {
          let mapping: Omit<NewsTopics, "id"> = {
            topics_id: x.id,
            news_id: dataNews.id
          }
    
          return mapping
        })
    
        const newsResult = await this._newsRepository.save(
          dataNews,
          topicList
        );

        if (!newsResult) {
          throw new ApplicationException("failed create data", "UnknownError")
        }

        return newsResult;
      };


}