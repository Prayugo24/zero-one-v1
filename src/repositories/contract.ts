import { NewsRequest, News } from "../models"

export interface INewsRepository {
    save(newsRequest: NewsRequest): Promise<News>;
    findById(id: number): Promise<News | null> 
}