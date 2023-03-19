import { config as dotenv } from 'dotenv';
dotenv()

class Constanta {
    static readonly NODE_ENV = process.env.NODE_ENV ? String(process.env.NODE_ENV).toLowerCase() : 'local'
    static readonly DATABSE_URL = process.env.DATABASE_NEWS ? String(process.env.DATABASE_NEWS) : ''
}
export default Constanta;