import { NewsService } from "../NewsService"
import { ApplicationException } from "../../exceptions/ApplicationException";
import { NewsQueryParams, News } from "../../models";


describe("NewsService", () => {
    describe("Tset findById function", () => {
        let newsRepository = {
            findById: jest.fn()
        };

        it("should return the news data if found", async () => {
          const id = 1;
          const newsData = {
            id: 1,
            title: "Breaking News",
            content: "This is a breaking news article",
          };
          newsRepository.findById.mockResolvedValue(newsData)
          
          const newsService = new NewsService(newsRepository);
          const result = await newsService.findById(id);
          expect(newsRepository.findById).toHaveBeenCalledWith(id);
          expect(result).toEqual(newsData);
        });
      
        it("should throw an ApplicationException if news is not found", async () => {
          const id = 999;
          newsRepository.findById.mockResolvedValue(null)
          const newsService = new NewsService(newsRepository);
          await expect(newsService.findById(id)).rejects.toThrow(
            new ApplicationException(`news id ${id} not found`, "NotFoundError")
          );
          expect(newsRepository.findById).toHaveBeenCalledWith(id);
        });

    });
    describe("Test findAll function", () => {

        let newsRepository = {
            findAll: jest.fn()
        };
        it("should return an array of news data", async () => {
          const request = {
            start_index: 0,
            limit: 10,
            status: "draft",
            topic: "sosial"
          };
      
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
      
          newsRepository.findAll.mockResolvedValue(newsData)
      
          const newsService = new NewsService(newsRepository);
      
          const result = await newsService.findAll(request);
      
          expect(result).toEqual(newsData);
          expect(newsRepository.findAll).toBeCalledWith({
            start_index: request.start_index,
            limit: request.limit,
            draft: request.status,
            topic: request.topic
          });
        });
      
        it('should throw an ApplicationException with NotFoundError code if no news data registered', async () => {
            // Arrange
            const request: NewsQueryParams = {
              start_index: 0,
              limit: 10,
              status: 'published',
              topic: 'sports',
            };
            const expectedError = new ApplicationException(
              'There are no news data registered',
              'NotFoundError'
            );
            newsRepository.findAll.mockResolvedValue([]);
            const newsService = new NewsService(newsRepository);
        
            // Act & Assert
            await expect(newsService.findAll(request)).rejects.toThrow(expectedError);
        });
    });

    describe("Test update function", () => {
        const mockId = 1;
        const mockNews = {
          id: 1,
          title: "Test Title",
          topics_ids: [1, 2, 3],
          content: "test",
          status: "published",
        };
        const mockTopics = [
          { id: 1, name: "Topic 1" },
          { id: 2, name: "Topic 2" },
        ];
      
        let newsRepository = {
            update: jest.fn()
        };

        let topicRepository = {
            findNotExistIds: jest.fn(),
            findManyByIdList: jest.fn(),
        }

      
        it("should throw an error if a topic id does not exist", async () => {
          const mockNotExistTopicId = 3;
          topicRepository.findNotExistIds.mockResolvedValue([3])
          const expectedErrorMessage = `topic id ${mockNotExistTopicId} not found`;
          const newsService = new NewsService(newsRepository, topicRepository);
          await expect(newsService.update(mockId, mockNews)).rejects.toThrow(expectedErrorMessage);
          
        });
      
        it("should update the news and related topics correctly", async () => {
          const mockAllTopics = mockTopics;
          const mockTopicList = [
            { topics_id: 1, news_id: 1 },
            { topics_id: 2, news_id: 1 },
          ];
          const mockUpdateData = {
            id: mockId,
            ...mockNews,
            news_topics: [
              { id: 1, ...mockTopicList[0] },
              { id: 2, ...mockTopicList[1] }
            ]
          };
      
          topicRepository.findNotExistIds.mockResolvedValue([]);
          topicRepository.findManyByIdList.mockResolvedValue(mockAllTopics);
          newsRepository.update.mockResolvedValue(mockUpdateData);
          
          const newsService = new NewsService(newsRepository, topicRepository);

          
          await expect(newsService.update(mockId, mockNews)).resolves.toEqual(mockUpdateData);
          await expect(topicRepository.findManyByIdList).toHaveBeenCalledWith(mockNews.topics_ids);
          await expect(newsRepository.update).toHaveBeenCalledWith(mockId, mockNews, mockTopicList);
        });
      
        it("should throw an error if update fails", async () => {
          const expectedErrorMessage = "failed update data";
      
          topicRepository.findNotExistIds.mockResolvedValue([]);
          topicRepository.findManyByIdList.mockResolvedValue(mockTopics);
          newsRepository.update.mockResolvedValue(null);
      
          const newsService = new NewsService(newsRepository, topicRepository);

          await expect(newsService.update(mockId, mockNews)).rejects.toThrow(ApplicationException);
          await expect(newsService.update(mockId, mockNews)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
    });

    describe("Test updateStatus function", () => {
        const id = 1;
        const statusData = "PUBLISHED";
        
        let newsRepository = {
            updateStatus: jest.fn()
        };

        let topicRepository = {}
        it("should return updated news data", async () => {
            newsRepository.updateStatus.mockResolvedValue({id, statusData})
            
            const newsService = new NewsService(newsRepository, topicRepository);
            const updatedNewsData = await newsService.updateStatus(id, statusData);
            // Assert
            expect(updatedNewsData).toEqual({id, statusData});
        });
    
        it("should throw ApplicationException when update fails", async () => {
            const expectedErrorMessage = "failed update status data";
            newsRepository.updateStatus.mockResolvedValue(null)
            const newsService = new NewsService(newsRepository, topicRepository);

            await expect(newsService.updateStatus(id, statusData)).rejects.toThrow(ApplicationException);
            await expect(newsService.updateStatus(id, statusData)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
    });

    describe("Test save function", () => {
        const mockNews = {
            id: 1,
            title: "Test Title",
            topics_ids: [1, 2, 3],
            content: "test",
            status: "published",
          };

        let newsRepository = {
            save: jest.fn(),
            findByTitle: jest.fn(),
        };

        let topicRepository = {
            findNotExistIds: jest.fn(),
            findManyByIdList: jest.fn(),
        }
        it("should throw an error if topic IDs do not exist", async () => {
            const mockNotExistTopicId = 1
            const expectedErrorMessage = `topic id ${mockNotExistTopicId} not found`;

            topicRepository.findNotExistIds.mockResolvedValue([mockNotExistTopicId]);
            
            const newsService = new NewsService(newsRepository, topicRepository);
            await expect(newsService.save(mockNews)).rejects.toThrow(ApplicationException);
            await expect(newsService.save(mockNews)).rejects.toThrow(expectedErrorMessage);
        });
      
        it("should throw a validation error if news title already exists", async () => {
          topicRepository.findNotExistIds.mockResolvedValue([]);
          newsRepository.findByTitle.mockResolvedValue(mockNews)
          const newsService = new NewsService(newsRepository, topicRepository);
          await expect(newsService.save(mockNews)).rejects.toThrow(ApplicationException);
          await expect(newsService.save(mockNews)).rejects.toEqual(
            new ApplicationException("Validation error", "ValidationError", [
              {
                param: 'title',
                message: 'title news sudah digunakan',
              },
            ])
          );
        });
      
        it("should save news and topics if all data is valid", async () => {
          
            const mockTopicList = [
                { topics_id: 1, news_id: 1 },
                { topics_id: 2, news_id: 1 },
            ];
            
            const newsResult = {
                id: 1,
                ...mockNews,
                news_topics: [
                  { id: 1, ...mockTopicList[0] },
                  { id: 2, ...mockTopicList[1] }
                ]
              };
          
            topicRepository.findNotExistIds.mockResolvedValue([]);
            topicRepository.findManyByIdList.mockResolvedValue(mockTopicList);
            newsRepository.findByTitle.mockResolvedValue(undefined)
            newsRepository.save.mockResolvedValue(newsResult)

            const newsService = new NewsService(newsRepository, topicRepository);
            
            await expect(newsService.save(mockNews)).resolves.toEqual(newsResult);
            await expect(topicRepository.findManyByIdList).toHaveBeenCalledWith(mockNews.topics_ids);
        });
    });


    
})
