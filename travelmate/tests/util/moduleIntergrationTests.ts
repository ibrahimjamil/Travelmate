/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';
import { AxiosInstance } from 'axios';
import sinon from 'sinon';
import { generateMock } from '@anatine/zod-mock';
import { expectValidation } from './validation';
import * as handleError from '../../src/lib/errors/handleError';

export type ExpectBaseEndpointFunctions<
  Model extends { id: number; isDeleted?: boolean | undefined },
> = {
  addEndpoint: () => void;
  getAllEndpoint: () => void;
  getByIdEndpoint: () => void;
  updateEndpoint: (fieldsToUpdate?: Partial<Model>) => void;
  deleteEndpoint: () => void;
};

export const expectBaseEndpointFactory = <
  Model extends { id: number; isDeleted?: boolean | undefined },
>(
  entityUrl: string,
  schema: z.AnyZodObject,
  axiosClient: AxiosInstance,
  seedData: Array<Record<string, unknown>> = [],
) => {
  const addSchema = schema.omit({ id: true, isDeleted: true, createdAt: true, updatedAt: true });
  const restartServer = sinon.stub(handleError, 'handleShutdown');
  const addEndpoint = {
    happy: async () => {
      const mockToAdd = generateMock(addSchema);

      const { data: addedData, status } = await axiosClient.post<Model[]>(
        `/${entityUrl}/`,
        mockToAdd,
      );
      const { data } = await axiosClient.get<Model>(`/${entityUrl}/${addedData[0].id}`);
      const validation = schema.safeParse(data);

      expect(status).toBe(201);
      expect(addedData).toMatchObject([data]);
      expectValidation(validation);
    },
    extraField: async () => {
      const mockToAdd = {
        ...generateMock(addSchema),
        extraField: 'test',
      };

      const { data: addedData, status } = await axiosClient.post<Model[]>(
        `/${entityUrl}/`,
        mockToAdd,
      );
      const { data } = await axiosClient.get<Model>(`/${entityUrl}/${addedData[0].id}`);
      const validation = schema.safeParse(data);

      expect(status).toBe(201);
      expect(addedData).toMatchObject([data]);
      expectValidation(validation);
    },
    badRequest: async (fieldsWithTypeError: Record<string, unknown>) => {
      const mockToAdd = {
        ...generateMock(addSchema),
        ...fieldsWithTypeError,
      };

      const { status } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
    emptyBody: async () => {
      const mockToAdd = {};

      const { status } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
  };

  const getAllEndpoint = {
    happy: async () => {
      const mockToAdd = generateMock(addSchema);
      await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);
      const minimumNumberOfEntities = seedData.length + 1;

      const { data, status } = await axiosClient.get<Model[]>(`/${entityUrl}/`);
      const validation = z.array(schema).safeParse(data);

      expect(status).toBe(200);
      expect(data.length).toBeGreaterThanOrEqual(minimumNumberOfEntities);
      expect(data).toEqual(
        expect.not.arrayContaining([expect.objectContaining({ isDeleted: true })]),
      );
      expectValidation(validation);
    },
  };

  const getByIdEndpoint = {
    happy: async () => {
      const mockToAdd = generateMock(addSchema);
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { data, status } = await axiosClient.get<Model>(`/${entityUrl}/${addedEntity[0].id}`);
      const validation = schema.safeParse(data);

      expect(status).toBe(200);
      expect(data).toMatchObject(addedEntity[0]);
      expectValidation(validation);
    },
    nonExistant: async () => {
      const { status } = await axiosClient.get<Model>(`/${entityUrl}/99999`);

      expect(status).toBe(404);
      expect(restartServer.called).toBe(false);
    },
    nanId: async () => {
      const { status } = await axiosClient.get<Model>(`/${entityUrl}/test`);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
  };

  const updateEndpoint = {
    happy: async (fieldsToUpdate?: Record<string, unknown>) => {
      const mockToAdd = generateMock(addSchema);
      const updateData = fieldsToUpdate || generateMock(addSchema);
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { data, status } = await axiosClient.patch<Model>(
        `/${entityUrl}/${addedEntity[0].id}`,
        updateData,
      );
      const validation = schema.safeParse(data);

      expect(status).toBe(200);
      expect(data).toMatchObject({
        ...addedEntity[0],
        ...updateData,
      });
      expectValidation(validation);
    },
    nonExistant: async () => {
      const updateData = generateMock(addSchema);
      const { status } = await axiosClient.patch<Model>(`/${entityUrl}/99999`, updateData);

      expect(status).toBe(404);
      expect(restartServer.called).toBe(false);
    },
    nanId: async () => {
      const updateData = generateMock(addSchema);
      const { status } = await axiosClient.patch<Model>(`/${entityUrl}/test`, updateData);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
    emptyBody: async () => {
      const mockToAdd = generateMock(addSchema);
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { status } = await axiosClient.patch<Model>(`/${entityUrl}/${addedEntity[0].id}`);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
    badRequest: async (fieldsWithTypeError: Record<string, unknown>) => {
      const mockToAdd = generateMock(addSchema);
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { status } = await axiosClient.patch<Model>(
        `/${entityUrl}/${addedEntity[0].id}`,
        fieldsWithTypeError,
      );

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
    extraFields: async () => {
      const mockToAdd = generateMock(addSchema);
      const updateMock = generateMock(addSchema);
      const updateData = { ...updateMock, testField: 'test' };
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { data, status } = await axiosClient.patch<Model>(
        `/${entityUrl}/${addedEntity[0].id}`,
        updateData,
      );
      const validation = schema.safeParse(data);

      expect(status).toBe(200);
      expect(data).toMatchObject({
        ...addedEntity[0],
        ...updateMock,
      });
      expectValidation(validation);
    },
  };

  const deleteEndpoint = {
    happy: async () => {
      const mockToAdd = generateMock(addSchema);
      const { data: addedEntity } = await axiosClient.post<Model[]>(`/${entityUrl}/`, mockToAdd);

      const { data, status } = await axiosClient.delete<Model>(
        `/${entityUrl}/${addedEntity[0].id}`,
      );
      const validation = schema.safeParse(data);
      const { data: allEntities } = await axiosClient.get<Model[]>(`/${entityUrl}/`);

      expect(status).toBe(200);
      expect(data.id).toBe(addedEntity[0].id);
      expect(data.isDeleted).toBe(true);
      expect(allEntities).toEqual(
        expect.not.arrayContaining([expect.objectContaining({ id: addedEntity[0].id })]),
      );
      expectValidation(validation);
    },
    nonExistant: async () => {
      const { status } = await axiosClient.delete<Model>(`/${entityUrl}/99999`);

      expect(status).toBe(404);
      expect(restartServer.called).toBe(false);
    },
    nanId: async () => {
      const { status } = await axiosClient.delete<Model>(`/${entityUrl}/test`);

      expect(status).toBe(400);
      expect(restartServer.called).toBe(false);
    },
  };

  return {
    addEndpoint,
    getAllEndpoint,
    getByIdEndpoint,
    updateEndpoint,
    deleteEndpoint,
  };
};
