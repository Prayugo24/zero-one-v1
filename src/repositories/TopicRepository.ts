import { TopicQueryParams, Topics } from "../models";
import { topicsTable } from "./Table";
import { ITopicRepository } from "./contract";
import { Op } from 'sequelize'

export class TopicRepository implements ITopicRepository {

    save = async (data: Topics): Promise<Topics> => {
        const saveData = await topicsTable.create({
            ...data
        },{ raw: true })

        return saveData?.get({ plain: true })
    }

    update = async (id: number, data: Topics): Promise<Topics | null> => {
        const updateData = await topicsTable.update({
            ...data,
        }, {
            where: {
                id
            },
        })
        if (!updateData) {
            return null
        }
        const result = await topicsTable.findByPk(id)
        if (!result) {
            return null
        }
        return result.get({ plain: true })
    }

    findById = async (id: number): Promise<Topics | null> => {
        const dataNew= await topicsTable.findByPk(id);
        if (!dataNew) {
            return null
        }
        
        return dataNew.get({ plain: true })
    }

    findByName = async (name: string): Promise<Topics | null> => {
        const dataNew = await topicsTable.findOne({
            where:{
                name: name
            }
        });
        if (!dataNew) {
            return null
        }
        
        return dataNew.get({ plain: true })
    }

    findAll = async (request: TopicQueryParams): Promise<Topics[]> => {
        const skip = Number(request.start_index) || 1;
        const take = Number(request.limit) || 10;

        const topics = await topicsTable.findAll({
            limit: take,
            offset: (skip - 1) * take,
        });

        return topics.map(x => x.get({plain: true}))
    }

    findManyByIdList = async(ids: number[]): Promise<Topics[]> => {
        const findData = await topicsTable.findAll({
            where: {
              id: {
                [Op.in]: ids,
              },
            },
          });

        return findData.map((x) => x.get({ plain: true }));
    }

    findNotExistIds = async(ids: number[]): Promise<number[]> => { 
        const existingIds = await topicsTable.findAll({
            attributes: ['id'],
            where: { id: { [Op.in]: ids } }
        });
        const existingIdSet = new Set(existingIds.map(row => row.get('id')));
        const missingIds = ids.filter(id => !existingIdSet.has(id));
        return missingIds;
    }

    deleteById = async (id: number): Promise<boolean> => {
        const result = await topicsTable.findByPk(id);
        if (!result) {
            return false;
        }
        
        await topicsTable.destroy({
            where: {
              id: id
            }
        });
        
        return true;
    }
}