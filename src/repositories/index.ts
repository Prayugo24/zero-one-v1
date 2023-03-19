import { INewsRepository, ITopicRepository , RepoCollection } from "./contract";
import { NewsRepository } from "./NewsRepository";
import { TopicRepository } from "./TopicRepository";

export function generateSequelizeRepositories(): RepoCollection {
    const newsRepository: INewsRepository = new NewsRepository();
    const topicRepository: ITopicRepository = new TopicRepository();
    return {
        newsRepository,
        topicRepository
    }
        
    
}