import { TopicService } from '../TopicService';
import { ApplicationException } from "../../exceptions/ApplicationException";


describe("TopicService", () => {
    describe("Test findByid function", () =>{
        it("should return a topic object if valid id is passed", async () => {
            const id = 1;
            const topicRepositoryMock = {
                findById: jest.fn().mockReturnValue({ id: 1, name: "test topic" })
            };
            const topicService = new TopicService(topicRepositoryMock);
            const result = await topicService.findById(id);
            expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual({ id: 1, name: "test topic" });
        });
        
        it("should throw an error if invalid id is passed", async () => {
            const id = 999;
            const topicRepositoryMock = {
                findById: jest.fn().mockReturnValue(null)
            };
            const topicService = new TopicService(topicRepositoryMock);
            try {
                await topicService.findById(id);
            } catch (error) {
                expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
                expect(error).toBeInstanceOf(ApplicationException);
                expect(error.message).toBe(`Topic id '${id}' not found`);
            }
        });
    });

    describe('Test findAll function', () => {
        it('should throw an error if there are no topics registered', async () => {
          const topicRepository = {
            findAll: jest.fn().mockResolvedValue([])
          };
          const topicQueryParams = {
            start_index: 0,
            limit: 10
          };
          const service = new TopicService(topicRepository);
      
          await expect(service.findAll(topicQueryParams)).rejects.toThrow(
            ApplicationException
          );
        });
      
        it('should return an array of topics if there are topics registered', async () => {
          const topicRepository = {
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, name: 'Topic 1' }, { id: 2, name: 'Topic 2' }])
          };
          const topicQueryParams = {
            start_index: 0,
            limit: 10
          };
          const service = new TopicService(topicRepository);
      
          const topics = await service.findAll(topicQueryParams);
      
          expect(topics).toEqual([{ id: 1, name: 'Topic 1' }, { id: 2, name: 'Topic 2' }]);
        });
    });

    describe('Test deleteById function', () => {
        
        let topicRepositoryMock = {
            findById: jest.fn().mockReturnValue(null),
            deleteById: jest.fn().mockReturnValue(null)
        };
        it('throws an error if id is not provided', async () => {
            const topicService = new TopicService(topicRepositoryMock);
            try {
                await topicService.deleteById(undefined);
            } catch (error) {
                expect(error).toBeInstanceOf(ApplicationException);
                expect(error.message).toBe(`Id is required`);
            }
        });

        it("throws an error if topic with the given id doesn't exist", async () => {
            const id = 123;
            const topicService = new TopicService(topicRepositoryMock);
            try {
                await topicService.deleteById(id);
            } catch (error) {
                expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
                expect(error).toBeInstanceOf(ApplicationException);
                expect(error.message).toBe(`Topic id '${id}' not found`);
            }
        });

        it('throws an error if the repository fails to delete the topic', async () => {
            const id = 123;
            topicRepositoryMock.findById = jest.fn().mockReturnValue({ id: 1, name: "test topic" })
            topicRepositoryMock.deleteById = jest.fn().mockReturnValue(false)
        
            const topicService = new TopicService(topicRepositoryMock);
            try {
                await topicService.deleteById(id);
            } catch (error) {
                expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
                expect(topicRepositoryMock.deleteById).toHaveBeenCalledWith(id);
                expect(error).toBeInstanceOf(ApplicationException);
                expect(error.message).toBe(`failed delete Topic id '${id}' `);
            }
            
        });

        it('returns true if the topic is successfully deleted', async () => {
            const id = 123;
            const getData = {};
            topicRepositoryMock.findById = jest.fn().mockReturnValue({ id: 1, name: "test topic" })
            topicRepositoryMock.deleteById = jest.fn().mockReturnValue(true)
            const topicService = new TopicService(topicRepositoryMock);
            await expect(topicService.deleteById(id)).resolves.toBe(true);
        });
    });

    describe("Test update function", ()=> {
        let topicRepositoryMock = {
          findById: jest.fn(),
          update: jest.fn()
        }
      
        it("should update topic given an id and data", async () => {
          const id = 1
          const topicData = { id: 1, name: "test topic" }
          const mockResult = { id: 1, ...topicData }
      
          topicRepositoryMock.findById.mockReturnValue(mockResult)
          topicRepositoryMock.update.mockReturnValue(mockResult)
      
          const topicsService = new TopicService(topicRepositoryMock)
          const result = await topicsService.update(id, topicData)
      
          expect(topicRepositoryMock.findById).toHaveBeenCalledTimes(1)
          expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id)
          expect(topicRepositoryMock.update).toHaveBeenCalledTimes(1)
          expect(topicRepositoryMock.update).toHaveBeenCalledWith(id, topicData)
          expect(result).toEqual(mockResult)
        })
      
        it("should throw an error if topic not found", async ()=> {
          const id = 2
          const topicData = { id: 2, name: "test topic" }
          topicRepositoryMock.findById.mockReturnValue(null)
      
          const topicsService = new TopicService(topicRepositoryMock)
      
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(ApplicationException)
          await expect(topicsService.update(id, topicData)).rejects.toThrowError("Topic id '2' not found")
          
        })
      
        it("should throw an error if update failed", async ()=> {
          const id = 3
          const topicData = { id: 3, name: "test topic" }
          topicRepositoryMock.findById.mockReturnValue({ id: 3, ...topicData })
          topicRepositoryMock.update.mockReturnValue(null)
      
          const topicsService = new TopicService(topicRepositoryMock)
      
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(ApplicationException)
          await expect(topicsService.update(id, topicData)).rejects.toThrowError("failed update data")
          
        })
    })

    describe("Test save function", () => {
        let topicRepositoryMock = {
            findByName: jest.fn(),
            save: jest.fn(),
        };
        it("should save a new topic if the name is not already in use", async () => {
          const topic = { id: 3, name: "test topic"};
          topicRepositoryMock.findByName.mockReturnValue(null)
          topicRepositoryMock.save.mockResolvedValue(topic)
      
          const topicsService = new TopicService(topicRepositoryMock);
          const savedTopic = await topicsService.save(topic);
      
          expect(topicRepositoryMock.findByName).toHaveBeenCalledWith(topic.name);
          expect(topicRepositoryMock.save).toHaveBeenCalledWith(topic);
          expect(savedTopic).toEqual(topic);
        });

      
        it("should throw an ApplicationException if the name is already in use", async () => {
          const topic = { id: 3, name: "test topic"};
          
          topicRepositoryMock.findByName.mockResolvedValue(topic)
          const service = new TopicService(topicRepositoryMock);
      
          await expect(service.save(topic)).rejects.toEqual(
            new ApplicationException("Validation error", "ValidationError", [
              {
                param: "name",
                message: "name topic sudah digunakan",
              },
            ])
          );
        });
    });

      
})