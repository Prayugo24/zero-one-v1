import { NewsRequest } from "../models"
import { News } from "../models"

export interface InewsRepository {
    save(newsRequest: NewsRequest): Promise<News>;
    
}