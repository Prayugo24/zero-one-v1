import logger from '../../utils/Logger';
import { Sequelize, ModelAttributeColumnOptions, DataTypes } from 'sequelize';
import { config as dotenv } from 'dotenv';
dotenv()

let newsContentDb: Sequelize | null

export function getNewsContentDb(): Sequelize {
    if (!newsContentDb) {
        newsContentDb = new Sequelize(
            process.env.DATABASE_NEWS || "",
            {
                define: {
                    timestamps:false
                },
                logging: (msg) => logger.http(msg)
            }
        )
    }
    return newsContentDb;
}

export type DataTypesChaining = {
    asPrimaryKey(isAutoIncrement?: boolean): DataTypesChaining
    isNullable(): DataTypesChaining
    withDefault(defaultValue: any): DataTypesChaining
} & ModelAttributeColumnOptions

export function getDataTypesChaining(type: DataTypes.DataType, attributes?: ModelAttributeColumnOptions): DataTypesChaining {
    attributes = attributes || {} as ModelAttributeColumnOptions
    const columnAtribute: ModelAttributeColumnOptions = {
        ...attributes
    }
    columnAtribute.type = type
    const asPrimaryKey = (isAutoIncrement?: boolean) => {
        return getDataTypesChaining(columnAtribute.type, {
            ...columnAtribute,
            primaryKey: true,
            autoIncrement: isAutoIncrement || false
        })
    }
    const isNullable = () => {
        return getDataTypesChaining(columnAtribute.type, {
            ...columnAtribute,
            allowNull: true
        })
    }
    const withDefault = (defaultValue: any) => {
        return getDataTypesChaining(columnAtribute.type, {
            ...columnAtribute,
            defaultValue
        })
    }



    return {
        asPrimaryKey,
        isNullable,
        withDefault,
        ...columnAtribute,
    }
}