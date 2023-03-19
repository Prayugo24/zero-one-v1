import { NewsService } from "../NewsService"
import { ApplicationException } from "../../exceptions/ApplicationException";
import { NewsQueryParams, News } from "../../models";
import { ITopicRepository, INewsRepository } from '../../repositories/contract';

let topicRepositoryMock: ITopicRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  deleteById: jest.fn(),
  update: jest.fn(),
  findByName: jest.fn(),
  save: jest.fn(),
  findManyByIdList: jest.fn(),
  findNotExistIds: jest.fn()
};

let newsRepositoryMock: INewsRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  save: jest.fn(),
  findByTitle: jest.fn()
}

const newsData = {
  id: 1,
  title: "Breaking News",
  content: "This is a breaking news article",
  topics_ids: [1, 2, 3],
  status: "PUBLISHED"
};

const mockTopics = [
  { id: 1, name: "Topic 1"},
  { id: 2, name: "Topic 2"},
];

const mockTopicListId = [
  { topics_id: 1, news_id: 1 },
  { topics_id: 2, news_id: 1 },
];


const request: NewsQueryParams = {
  start_index: 0,
  limit: 10,
  status: "draft",
  topic: "sosial"
};

describe("NewsService", () => {
    describe("Tset findById function", () => {

        it("should return the news data if found", async () => {
          const id = 1;
          
          newsRepositoryMock.findById.mockResolvedValue(newsData)
          const newsService = new NewsService(newsRepositoryMock);
          const result = await newsService.findById(id);
          expect(newsRepositoryMock.findById).toHaveBeenCalledWith(id);
          expect(result).toEqual(newsData);
        });
      
        it("should throw an ApplicationException if news is not found", async () => {
          const id = 999;
          newsRepositoryMock.findById.mockResolvedValue(null)
          const newsService = new NewsService(newsRepositoryMock);

          const expectedErrorMessage = `news id ${id} not found`;
          await expect(newsService.findById(id)).rejects.toThrow(ApplicationException);
          await expect(newsService.findById(id)).rejects.toMatchObject({ message: expectedErrorMessage });
          expect(newsRepositoryMock.findById).toHaveBeenCalledWith(id);
        });

    });
    describe("Test findAll function", () => {

        it("should return an array of news data", async () => {
          
          const newsData = [
            {
              id: 1,
              title: "Test news 1",
              content: "This is a test news 1",
              status: "draft",
              topic: "sosial"
            },
            {
              id: 2,
              title: "Test news 2",
              content: "This is a test news 2",
              status: "draft",
              topic: "sosial"
            }
          ];
      
          newsRepositoryMock.findAll.mockResolvedValue(newsData)
      
          const newsService = new NewsService(newsRepositoryMock);
      
          const result = await newsService.findAll(request);
      
          expect(result).toEqual(newsData);
          expect(newsRepositoryMock.findAll).toBeCalledWith({
            start_index: request.start_index,
            limit: request.limit,
            status: request.status,
            topic: request.topic
          });
        });
      
        it('should throw an ApplicationException with NotFoundError code if no news data registered', async () => {
            
            const expectedErrorMessage = `There are no news data registered`;
            newsRepositoryMock.findAll.mockResolvedValue([]);
            const newsService = new NewsService(newsRepositoryMock);
        
            await expect(newsService.findAll(request)).rejects.toThrow(ApplicationException);
            await expect(newsService.findAll(request)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
    });

    describe("Test update function", () => {
        
        it("should throw an error if a topic id does not exist", async () => {
          const mockNotExistTopicId = 3;
          topicRepositoryMock.findNotExistIds.mockResolvedValue([3])
          const expectedErrorMessage = `topic id ${mockNotExistTopicId} not found`;
          const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
          await expect(newsService.update(1, newsData)).rejects.toThrow(expectedErrorMessage);
          
        });
      
        it("should update the news and related topics correctly", async () => {
          
          const mockUpdateData = {
            id: 1,
            ...newsData,
            news_topics: [
              { id: 1, ...mockTopicListId[0] },
              { id: 2, ...mockTopicListId[1] }
            ]
          };
      
          topicRepositoryMock.findNotExistIds.mockResolvedValue([]);
          topicRepositoryMock.findManyByIdList.mockResolvedValue(mockTopics);
          newsRepositoryMock.update.mockResolvedValue(mockUpdateData);
          
          const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
          await expect(newsService.update(1, newsData)).resolves.toEqual(mockUpdateData);
          await expect(topicRepositoryMock.findManyByIdList).toHaveBeenCalledWith(newsData.topics_ids);
          await expect(newsRepositoryMock.update).toHaveBeenCalledWith(1, newsData, mockTopicListId);
        });
      
        it("should throw an error if update fails", async () => {
          const expectedErrorMessage = "failed update data";
      
          topicRepositoryMock.findNotExistIds.mockResolvedValue([]);
          topicRepositoryMock.findManyByIdList.mockResolvedValue(mockTopics);
          newsRepositoryMock.update.mockResolvedValue(null);
      
          const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);

          await expect(newsService.update(1, newsData)).rejects.toThrow(ApplicationException);
          await expect(newsService.update(1, newsData)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
    });

    describe("Test updateStatus function", () => {
        it("should return updated news data", async () => {
          newsRepositoryMock.updateStatus.mockResolvedValue({id:newsData.id , status:newsData.status})
            
          const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
          const updatedNewsData = await newsService.updateStatus(newsData.id, newsData.status);
          
          expect(updatedNewsData).toEqual({id:newsData.id , status:newsData.status});
        });
    
        it("should throw ApplicationException when update fails", async () => {
            const expectedErrorMessage = "failed update status data";
            newsRepositoryMock.updateStatus.mockResolvedValue(null)
            const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);

            await expect(newsService.updateStatus(newsData.id, newsData.status)).rejects.toThrow(ApplicationException);
            await expect(newsService.updateStatus(newsData.id, newsData.status)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
    });

    describe("Test save function", () => {
        
        it("should throw an error if topic IDs do not exist", async () => {
            const mockNotExistTopicId = 1
            const expectedErrorMessage = `topic id ${mockNotExistTopicId} not found`;

            topicRepositoryMock.findNotExistIds.mockResolvedValue([mockNotExistTopicId]);
            
            const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
            await expect(newsService.save(newsData)).rejects.toThrow(ApplicationException);
            await expect(newsService.save(newsData)).rejects.toThrow(expectedErrorMessage);
        });
      
        it("should throw a validation error if news title already exists", async () => {
          topicRepositoryMock.findNotExistIds.mockResolvedValue([]);
          newsRepositoryMock.findByTitle.mockResolvedValue(newsData)
          const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
          await expect(newsService.save(newsData)).rejects.toThrow(ApplicationException);
          await expect(newsService.save(newsData)).rejects.toEqual(
            new ApplicationException("Validation error", "ValidationError", [
              {
                param: 'title',
                message: 'title news sudah digunakan',
              },
            ])
          );
        });
      
        it("should save news and topics if all data is valid", async () => {
          
            const newsResult = {
                id: 1,
                ...newsData,
                news_topics: [
                  { id: 1, ...mockTopicListId[0] },
                  { id: 2, ...mockTopicListId[1] }
                ]
              };
          
            topicRepositoryMock.findNotExistIds.mockResolvedValue([]);
            topicRepositoryMock.findManyByIdList.mockResolvedValue(mockTopicListId);
            newsRepositoryMock.findByTitle.mockResolvedValue(undefined)
            newsRepositoryMock.save.mockResolvedValue(newsResult)

            const newsService = new NewsService(newsRepositoryMock, topicRepositoryMock);
            
            await expect(newsService.save(newsData)).resolves.toEqual(newsResult);
            await expect(topicRepositoryMock.findManyByIdList).toHaveBeenCalledWith(newsData.topics_ids);
        });
    });


    
})
