import { Topics, News, TopicQueryParams, NewsQueryParams } from "../models"


export interface INewsService {
    save(request: News): Promise<News>;
    findById(id: number): Promise<News | null> 
    findAll(request: NewsQueryParams): Promise<News[]>
    update(id: number ,request: News): Promise<News>;
    updateStatus(id: number , status: string): Promise<News>;
}

export interface ITopicService {
    save(request: Topics): Promise<Topics>;
    findById(id: number): Promise<Topics | null> 
    findAll(request: TopicQueryParams): Promise<Topics[]>
    update(id: number , request: Topics): Promise<Topics>;
    deleteById(id: number): Promise<boolean> 
}

