import { Model, DataTypes, ModelDefined } from "sequelize"
import { News, Topics, NewsTopics } from "../models"
import { getNewsContentDb, getDataTypesChaining as _  } from '../models/db/Sequelize';

const defaultSetting = {
    underscored: true,
  };

export const newsTable = getNewsContentDb().define<Model<News>>('news', {
    id: _(DataTypes.NUMBER).asPrimaryKey(true),
    title: _(DataTypes.STRING),
    content: _(DataTypes.STRING),
    status: _(DataTypes.STRING)
}, {...defaultSetting, freezeTableName: true});

export const topicsTable = getNewsContentDb().define<Model<Topics>>('topics', {
    id: _(DataTypes.NUMBER).asPrimaryKey(true),
    name: _(DataTypes.STRING),
  }, {...defaultSetting, freezeTableName: true});

export const newsTopicsTable: ModelDefined<NewsTopics, NewsTopics>  = getNewsContentDb().define<Model<NewsTopics>>('news_topics',{
    id: _(DataTypes.NUMBER).asPrimaryKey(true),
    news_id: _(DataTypes.NUMBER),
    topics_id: _(DataTypes.NUMBER)
  }, {...defaultSetting, freezeTableName: true});

  newsTable.hasMany(newsTopicsTable, { foreignKey: "news_id", sourceKey: "id", as: "news_topics" })
  newsTopicsTable.belongsTo(newsTable, { foreignKey: "news_id", targetKey: "id" })

  newsTopicsTable.belongsTo(topicsTable, { foreignKey: "topics_id", targetKey: "id", as: "topics" })
