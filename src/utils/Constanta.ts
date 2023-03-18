import { config as dotenv } from 'dotenv';
dotenv()

class Constanta {
    static readonly NODE_ENV = process.env.NODE_ENV ? String(process.env.NODE_ENV).toLowerCase() : 'local'
}
export default Constanta;