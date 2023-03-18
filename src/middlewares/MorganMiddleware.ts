import morgan, { StreamOptions } from "morgan";
import Constanta from '../utils/Constanta';
import Logger from '../utils/Logger'


const stream: StreamOptions = {

    write: (msg) => Logger.http(msg)
}

const skip = () => {
    return Constanta.NODE_ENV === "prod"
}


export const morganMiddleware = morgan("common", { stream, skip })

