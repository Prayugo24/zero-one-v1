import BaseRoutes from '../BaseRoutes';
import { NewsController } from '../../controllers/NewsController';


export class NewsRoutes extends BaseRoutes {
  private _newsController: NewsController;

  constructor(newsController: NewsController) {
    super();
    this._newsController = newsController;
  }

  public routes(): void {
    this.router.get('/',  this._newsController.request);
  }
}






