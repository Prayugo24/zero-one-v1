import { Model, DataTypes } from "sequelize"
import { News, Topics, NewsTopics } from "../models"
import { getNewsContentDb, getDataTypesChaining as _  } from '../models/db/Sequelize';


export const newsTable = getNewsContentDb().define<Model<News>>('news', {
    id: _(DataTypes.STRING).asPrimaryKey(),
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING
}) 

export const topicsTable = getNewsContentDb().define<Model<Topics>>('topics', {
    id: _(DataTypes.STRING).asPrimaryKey(),
    name: DataTypes.STRING
})

export const newsTopicsTable = getNewsContentDb().define<Model<NewsTopics>>('news_topics',{
    news_id: DataTypes.INTEGER,
    topics_id: DataTypes.INTEGER
})

