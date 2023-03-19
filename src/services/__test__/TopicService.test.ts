import { TopicService } from '../TopicService';
import { ApplicationException } from "../../exceptions/ApplicationException";
import { ITopicRepository } from '../../repositories/contract';


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

const topicQueryParams = {
  start_index: 0,
  limit: 10
};

describe("TopicService", () => {
    describe("Test findByid function", () => {

        

        it("should return a topic object if valid id is passed", async () => {
            const id = 1;
            topicRepositoryMock.findById.mockReturnValue({ id: 1, name: "test topic" })
            const topicService = new TopicService(topicRepositoryMock);
            const result = await topicService.findById(id);
            expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual({ id: 1, name: "test topic" });
        });
        
        it("should throw an error if invalid id is passed", async () => {
            const id = 999;
            topicRepositoryMock.findById.mockReturnValue(null)
            const topicService = new TopicService(topicRepositoryMock);
            
            const expectedErrorMessage = `Topic id '${id}' not found`;
            await expect(topicService.findById(id)).rejects.toThrow(ApplicationException);
            expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
            await expect(topicService.findById(id)).rejects.toMatchObject({ message: expectedErrorMessage });
            
        });
    });

    describe('Test findAll function', () => {
        it('should throw an error if there are no topics registered', async () => {
          
          const expectedErrorMessage = `There are no topics registered`;
          topicRepositoryMock.findAll.mockResolvedValue([])
          const topicService = new TopicService(topicRepositoryMock);
      
          await expect(topicService.findAll(topicQueryParams)).rejects.toThrow(ApplicationException);
          await expect(topicService.findAll(topicQueryParams)).rejects.toMatchObject({ message: expectedErrorMessage });
        });
      
        it('should return an array of topics if there are topics registered', async () => {
          
          topicRepositoryMock.findAll.mockResolvedValue([{ id: 1, name: 'Topic 1' }, { id: 2, name: 'Topic 2' }])
          const topicService = new TopicService(topicRepositoryMock);
          const topics = await topicService.findAll(topicQueryParams);
          expect(topics).toEqual([{ id: 1, name: 'Topic 1' }, { id: 2, name: 'Topic 2' }]);
        });
    });

    describe('Test deleteById function', () => {
        
        it('throws an error if id is not provided', async () => {
          
          const topicService = new TopicService(topicRepositoryMock);
          const expectedErrorMessage = `Id is required`;
          await expect(topicService.deleteById(undefined)).rejects.toThrow(ApplicationException);
          await expect(topicService.deleteById(undefined)).rejects.toMatchObject({ message: expectedErrorMessage });  
        });

        it("throws an error if topic with the given id doesn't exist", async () => {
          const id = 123;
          const topicService = new TopicService(topicRepositoryMock);
          topicRepositoryMock.findById.mockReturnValue(null)
          
          const expectedErrorMessage = `Topic id '${id}' not found`;
          await expect(topicService.deleteById(id)).rejects.toThrow(ApplicationException);
          expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
          await expect(topicService.deleteById(id)).rejects.toMatchObject({ message: expectedErrorMessage });  
        });

        it('throws an error if the repository fails to delete the topic', async () => {
          const id = 123;
          topicRepositoryMock.findById.mockReturnValue({ id: 1, name: "test topic" })
          topicRepositoryMock.deleteById.mockReturnValue(false)
        
          const topicService = new TopicService(topicRepositoryMock);
            

          const expectedErrorMessage = `failed delete Topic id '${id}' `;
          await expect(topicService.deleteById(id)).rejects.toThrow(ApplicationException);
          expect(topicRepositoryMock.findById).toHaveBeenCalledWith(id);
          expect(topicRepositoryMock.deleteById).toHaveBeenCalledWith(id);
          await expect(topicService.deleteById(id)).rejects.toMatchObject({ message: expectedErrorMessage });  
            
        });

        it('returns true if the topic is successfully deleted', async () => {
          const id = 123;
          topicRepositoryMock.findById.mockReturnValue({ id: 1, name: "test topic" })
          topicRepositoryMock.deleteById.mockReturnValue(true)
          const topicService = new TopicService(topicRepositoryMock);
          await expect(topicService.deleteById(id)).resolves.toBe(true);
        });
    });

    describe("Test update function", ()=> {
        
        it("should update topic given an id and data", async () => {
          const id = 1
          const topicData = { id: 1, name: "test topic" }
          const mockResult = { id: 1, ...topicData }
      
          topicRepositoryMock.findById.mockReturnValue(mockResult)
          topicRepositoryMock.update.mockReturnValue(mockResult)
      
          const topicsService = new TopicService(topicRepositoryMock)
          const result = await topicsService.update(id, topicData)
      
          
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
          const expectedErrorMessage = `Topic id '${id}' not found`;
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(ApplicationException)
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(expectedErrorMessage)
          
        })
      
        it("should throw an error if update failed", async ()=> {
          const id = 3
          const topicData = { id: 3, name: "test topic" }
          topicRepositoryMock.findById.mockReturnValue({ id: 3, ...topicData })
          topicRepositoryMock.update.mockReturnValue(null)
      
          const topicsService = new TopicService(topicRepositoryMock)
          const expectedErrorMessage = `failed update data`;
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(ApplicationException)
          await expect(topicsService.update(id, topicData)).rejects.toThrowError(expectedErrorMessage)
          
        })
    })

    describe("Test save function", () => {
        
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