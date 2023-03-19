import { News, NewsTopics, NewsQueryParams  } from "../models";
import { newsTable, newsTopicsTable, topicsTable } from "./Table";
import { INewsRepository } from "./contract";
import { ApplicationException } from "../exceptions/ApplicationException";
import { Op } from "sequelize";


export class NewsRepository implements INewsRepository {

    save = async (news: News, topics?: NewsTopics[]): Promise<News | null> => {

        const resultModel = await newsTable.create({
            ...news
        }, { raw: true })

        if (!resultModel) {
            throw new ApplicationException("failed create news", "UnknownError")
        }

        let newsData = resultModel.get({ plain: true })
        
        await newsTopicsTable.bulkCreate(topics?.map(topic => ({ news_id: newsData.id, topics_id: topic.topics_id})) as NewsTopics[])
        
        const result = await newsTable.findOne({
            include: [
                { 
                    model: newsTopicsTable, 
                    include: [
                        {
                            model: topicsTable, 
                            as:'topics'  
                        }
                    ],
                    as:'news_topics'  
                }
            ],
            where: {
                id: newsData.id
            }
        })

        if (!result) {
            return null
        }


        return result.get({ plain: true })
    };

    update = async (id: number, data: News, topics?: NewsTopics[]): Promise<News | null> => {

        await newsTopicsTable.destroy({
            where: {
                news_id: id
            }
        })

        const updateData = await newsTable.update({
            ...data,
        }, {
            where: {
                id
            },
        })
        if (!updateData) {
            return null
        }
        await newsTopicsTable.bulkCreate(topics?.map(topic => ({ news_id: id, topics_id: topic.topics_id})) as NewsTopics[])

        const result = await newsTable.findOne({
            include: [
                { 
                    model: newsTopicsTable, 
                    include: [
                        {
                            model: topicsTable, 
                            as:'topics'  
                        }
                    ],
                    as:'news_topics'  
                }
            ],
            where: {
                id:id
            }
        })

        if (!result) {
            return null
        }
        return result.get({ plain: true })
    }

    updateStatus = async (id: number, statusData: string): Promise<News | null> => { 
        const updateData = await newsTable.update({
            status: statusData,
        }, {
            where: {
                id
            },
        })

        if (!updateData) {
            return null
        }
        const result = await newsTable.findOne({
            include: [
                { 
                    model: newsTopicsTable, 
                    include: [
                        {
                            model: topicsTable, 
                            as:'topics'  
                        }
                    ],
                    as:'news_topics'  
                }
            ],
            where: {
                id:id
            }
        })
        if (!result) {
            return null
        }
        return result.get({ plain: true })
    }

    findByTitle = async (title: string): Promise<News | null> => {
        const findData = await newsTable.findOne({
            where: {
                title: title
            }
        })

        if(!findData) {
            return null
        }

        return findData.get({ plain: true })
    }

    findById = async (id: number): Promise<News | null> => {
        const findData = await newsTable.findOne({
            include: [
                { 
                    model: newsTopicsTable, 
                    include: [
                        {
                            model: topicsTable, 
                            as:'topics'  
                        }
                    ],
                    as:'news_topics'  
                }
            ],
            where: {
                id:id
            }
        })

        if (!findData) {
            return null
        }
        
        return findData.get({ plain: true })
    }

    findAll = async (request: NewsQueryParams): Promise<News[]> => {
        const skip = Number(request.start_index) || 1;
        const take = Number(request.limit) || 10;
        const status = request.status || '';
        const topic = request.topic || '';

        let whereNews: any = {};
        let whereTopic: any = {};
        if(status !='') {
            whereNews.status = status;
        }
        if(topic !='') { 
            whereTopic.name = topic;
        }
        
        const findData = await newsTable.findAll({
            include: [
              {
                model: newsTopicsTable,
                include: [
                  {
                    model: topicsTable,
                    as: 'topics',
                    where: whereTopic,
                  }
                ],
                as: 'news_topics',
                required: true,
              }
            ],
            where:whereNews,
            subQuery: false,
            limit: take,
            offset: (skip - 1) * take,
            
          });
        console.log(findData)
        return findData.map(x => x.get({plain: true}))

    }
}