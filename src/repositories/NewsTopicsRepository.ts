import { INewsTopicRepository } from "./contract";
import { NewsTopics } from "../models";
import { newsTopicsTable } from "./Table";

export class NewsTopicRepository implements INewsTopicRepository {

    findByIdTopicAndIdNews =  async (topic_id: number,news_id: number): Promise<NewsTopics | null> => {
        const findData = await newsTopicsTable.findOne({
            where: {
                news_id: news_id,
                topics_id: topic_id
            }
        })
        
        if (!findData) {
            return null
        }

        return findData.get({ plain:true })
    }

}