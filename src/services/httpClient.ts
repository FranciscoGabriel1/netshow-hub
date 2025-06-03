import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get<T>(url, config);
      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Erro desconhecido';
      const status = err.response?.status || 500;
      return { data: null, error: message, status };
    }
  }

  public async post<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post<T>(url, body, config);
      return { data: response.data, error: null, status: response.status };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Erro desconhecido';
      const status = err.response?.status || 500;
      return { data: null, error: message, status };
    }
  }

  public async patch<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.patch<T>(url, body, config);
      return { data: response.data, error: null, status: response.status };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Erro desconhecido';
      const status = err.response?.status || 500;
      return { data: null, error: message, status };
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete<T>(url, config);
      return { data: response.data, error: null, status: response.status };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        'Erro desconhecido';
      const status = err.response?.status || 500;
      return { data: null, error: message, status };
    }
  }
}

export const httpClient = new HttpClient('http://localhost:3000');
