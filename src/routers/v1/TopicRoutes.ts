import BaseRoutes from "../BaseRoutes";
import { TopicController } from "../../controllers/TopicController";
import validate from "../../middlewares/ValidatorMiddleware";
import { createTopic } from "../../validations/NewsValidation";

export class TopicRoutes extends BaseRoutes {
    private _topicController: TopicController;

    constructor(topicController: TopicController) {
        super()
        this._topicController = topicController
    }
    public routes(): void {
        this.router.post('/', validate(createTopic), this._topicController.save);
        this.router.get('/:id',  this._topicController.findByid);
        this.router.get('/',  this._topicController.findAll);
        this.router.put('/:id', validate(createTopic), this._topicController.update);
        this.router.delete('/:id',  this._topicController.deleteById);
    }
}