import { NewsRequest, News } from "../models"

export interface INewsService {
    save(newsRequest: NewsRequest): Promise<News>;
    findById(id: number): Promise<News | null> 
}