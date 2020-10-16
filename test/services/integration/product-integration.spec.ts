import { Request, Response } from "@src/util/request";
import { ProductIntegration } from "@src/services/integration/product-integration";
import cache from "@src/config/cache";

describe('Product Integration Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  describe('Get product by ID', () => {
    it('Should return Success - search product that exists no cached ', async () => {
      const requestMock = new Request();
      const cacheMock = cache;
      const service = new ProductIntegration(requestMock, cacheMock);

      const resultRequestMock = {
        data: {
          "price": 704.8,
          "image": "http://challenge-api.luizalabs.com/images/ddeb989e-53c4-e68b-aa93-6e43afddb797.jpg",
          "brand": "burigotto",
          "id": "ddeb989e-53c4-e68b-aa93-6e43afddb797",
          "title": "Cadeira para Auto Burigotto Matrix p/ Crianças"
        }
      } as Response

      const mockRequest = jest.spyOn(requestMock, 'get');
      mockRequest.mockImplementation(() => new Promise((resolve, reject) => {
        resolve(resultRequestMock);
      }));

      const mockCache = jest.spyOn(cacheMock, 'get');
      mockCache.mockImplementation(() => new Promise((resolve, reject) => {
        resolve(undefined);
      }));

      try {
        const product = await service.getProductById('ddeb989e-53c4-e68b-aa93-6e43afddb797');
        expect(product).toBe(resultRequestMock.data);
      } catch (error) {
        fail();
      }
    });

    it('Should return Success - search product that exists cached ', async () => {
      const requestMock = new Request();
      const cacheMock = cache;
      const service = new ProductIntegration(requestMock, cacheMock);

      const resultCacheMock = {
        "price": 704.8,
        "image": "http://challenge-api.luizalabs.com/images/ddeb989e-53c4-e68b-aa93-6e43afddb797.jpg",
        "brand": "burigotto",
        "id": "ddeb989e-53c4-e68b-aa93-6e43afddb797",
        "title": "Cadeira para Auto Burigotto Matrix p/ Crianças"
      }


      const mockCache = jest.spyOn(cacheMock, 'get');
      mockCache.mockImplementation(() => new Promise((resolve, reject) => {
        resolve(resultCacheMock);
      }));

      try {
        const product = await service.getProductById('ddeb989e-53c4-e68b-aa93-6e43afddb797');
        expect(product).toBe(resultCacheMock);
      } catch (error) {
        fail();
      }
    });

    it('Should return Error - search product not found in API ', async () => {
      const requestMock = new Request();
      const cacheMock = cache;
      const service = new ProductIntegration(requestMock, cacheMock);

      const resultRequestErrorMock = {
        isAxiosError: true,
        response: {
          status: 404
        }
      }

      const mockRequest = jest.spyOn(requestMock, 'get');
      mockRequest.mockImplementation(() => new Promise((resolve, reject) => {
        reject(resultRequestErrorMock);
      }));

      const mockCache = jest.spyOn(cacheMock, 'get');
      mockCache.mockImplementation(() => new Promise((resolve, reject) => {
        resolve(undefined);
      }));

      try {
        await service.getProductById('idProductFake');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('productNotFund'));
      }
    });

    it('Should return Error - search product in api but unexpected error ', async () => {
      const requestMock = new Request();
      const cacheMock = cache;
      const service = new ProductIntegration(requestMock, cacheMock);

      const resultRequestErrorMock = {
        isAxiosError: true,
        response: {
          status: 500
        }
      }

      const mockRequest = jest.spyOn(requestMock, 'get');
      mockRequest.mockImplementation(() => new Promise((resolve, reject) => {
        reject(resultRequestErrorMock);
      }));

      const mockCache = jest.spyOn(cacheMock, 'get');
      mockCache.mockImplementation(() => new Promise((resolve, reject) => {
        resolve(undefined);
      }));

      try {
        await service.getProductById('idProductFake');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('UnexpectedError'));
      }
    });
    
  });
});