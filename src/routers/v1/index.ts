import BaseRoutes from '../BaseRoutes';
import { NewsController } from '../../controllers/NewsController';
import { NewsRoutes } from './NewsRoutes';
import { NewsService } from '../../services/NewsService';
import { TopicService } from '../../services/TopicService';
import { TopicRoutes } from './TopicRoutes';
import { TopicController } from '../../controllers/TopicController';
import { RepoCollection } from '../../repositories/contract';
import { generateSequelizeRepositories } from '../../repositories';

const repoCollection: RepoCollection = generateSequelizeRepositories()
const { newsRepository, topicRepository } = repoCollection

const newsService = new NewsService(newsRepository, topicRepository);
const newsController = new NewsController(newsService);
const newsRouters = new NewsRoutes(newsController)
newsRouters.routes()

const topicService = new TopicService(topicRepository)
const topicController = new TopicController(topicService)
const topicRouters = new TopicRoutes(topicController)
topicRouters.routes()

export class AppV1 extends BaseRoutes {
  constructor() {
    super();
  }

  public routes(): void {
    this.router.use('/news', newsRouters.router)
    this.router.use('/topic', topicRouters.router)
  }
}






