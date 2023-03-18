import BaseRoutes from '../BaseRoutes';
import { NewsController } from '../../controllers/NewsController';
import { NewsRoutes } from './NewsRoutes';


const newsController = new NewsController();
const newsRouters = new NewsRoutes(newsController)
newsRouters.routes()

export class AppV1 extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    this.router.use('/news', newsRouters.router)
  }
}






