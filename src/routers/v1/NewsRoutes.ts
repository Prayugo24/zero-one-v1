import BaseRoutes from '../BaseRoutes';
import { NewsController } from '../../controllers/NewsController';
import { createNewsValidate, updateNewsStatus } from '../../validations/NewsValidation';
import validate from '../../middlewares/ValidatorMiddleware';

export class NewsRoutes extends BaseRoutes {
  private _newsController: NewsController;

  constructor(newsController: NewsController) {
    super();
    this._newsController = newsController;
  }

  public routes(): void {
    this.router.post('/', validate(createNewsValidate), this._newsController.save);
    this.router.get('/:id',  this._newsController.findById);
    this.router.get('/',  this._newsController.findAll);
    this.router.put('/:id', validate(createNewsValidate), this._newsController.update);
    this.router.put('/status/:id', validate(updateNewsStatus), this._newsController.updateStatus);
  }
}






