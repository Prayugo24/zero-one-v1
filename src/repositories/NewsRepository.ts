import { News } from "../models";
import { newsTable } from "./Table";
import { INewsRepository } from "./contract";

export class NewsRepository implements INewsRepository {

    save = async (data: News): Promise<News> => {
        return await (await newsTable.create(data)).get({plain: true});
    }

    findById = async (id: number): Promise<News | null> => {
        const dataNew= await newsTable.findByPk(id);
        if (!dataNew) {
            return null
        }
        return dataNew.get({ plain: true })
    }
}