import {ApiResponse} from '@/core/interfaces';
import {Axios} from 'axios';
import {ApiRepositoryContract} from './contracts';

export class ApiRepository implements ApiRepositoryContract {
  constructor(private readonly coreApiInstance: Axios) {}

  async get(url: string, config?: Record<string, any>) {
    try {
      const response = await this.coreApiInstance.get(url, config);
      return response;
    } catch (e: any) {
      return e;
    }
  }

  async post(url: string, data: any, config?: Record<string, any>) {
    try {
      const response = await this.coreApiInstance.post(url, data, config);
      return response;
    } catch (e: any) {
      return e;
    }
  }

  async patch(
    url: string,
    data: Record<string, any> | null,
    config?: Record<string, any> | undefined,
  ): Promise<ApiResponse<any>> {
    try {
      return await this.coreApiInstance.patch(url, data, config);
    } catch (e: any) {
      return e;
    }
  }

  async put(
    url: string,
    data: Record<string, any> | null,
    config?: Record<string, any> | undefined,
  ): Promise<ApiResponse<any>> {
    try {
      return await this.coreApiInstance.put(url, data, config);
    } catch (e: any) {
      return e;
    }
  }

  async delete(
    url: string,
    config?: Record<string, any> | undefined,
  ): Promise<ApiResponse<any>> {
    try {
      return await this.coreApiInstance.delete(url, config);
    } catch (e: any) {
      return e;
    }
  }
}
