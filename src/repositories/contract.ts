import { News, Topics, NewsTopics ,TopicQueryParams, NewsQueryParams } from "../models"

export interface INewsRepository {
    save(news: News, topics?: NewsTopics[]): Promise<News | null>;
    findById(id: number): Promise<News | null> 
    findAll(request: NewsQueryParams): Promise<News[]> 
    findByTitle(title: string): Promise<News | null> 
    update(id: number, news: News, topics?: NewsTopics[]): Promise<News | null>;
    updateStatus(id: number, status: string): Promise<News | null>;
}
export interface ITopicRepository {
    save(reequest: Topics): Promise<Topics>;
    findById(id: number): Promise<Topics | null> 
    findByName(name: string): Promise<Topics | null> 
    findAll(request: TopicQueryParams): Promise<Topics[]> 
    findManyByIdList(id: number[]): Promise<Topics[]> 
    findNotExistIds(ids: number[]): Promise<number[]> 
    update(id: number, request: Topics): Promise<Topics | null>;
    deleteById(id: number): Promise<boolean> 
}

export interface INewsTopicRepository {
    findByIdTopicAndIdNews(topic_id: number,news_id: number): Promise<NewsTopics | null>
}

export type RepoCollection = {
    newsRepository: INewsRepository;
    topicRepository: ITopicRepository;
}