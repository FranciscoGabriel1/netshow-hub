import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export interface HttpResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}
interface ResponseWithMessage {
  message?: string;
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

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get<T>(url, config);
      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (err: unknown) {
      let message = 'Erro desconhecido';
      let status = 500;

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<unknown> & {
          response?: { data?: unknown; statusText?: string; status?: number };
        };
        if (
          typeof axiosErr.response?.data === 'object' &&
          axiosErr.response.data !== null
        ) {
          const dataObj = axiosErr.response.data as ResponseWithMessage;
          if (typeof dataObj.message === 'string') {
            message = dataObj.message;
          } else if (axiosErr.response?.statusText) {
            message = axiosErr.response.statusText;
          } else if (axiosErr.message) {
            message = axiosErr.message;
          }
        } else if (axiosErr.response?.statusText) {
          message = axiosErr.response.statusText;
        } else if (axiosErr.message) {
          message = axiosErr.message;
        }

        if (typeof axiosErr.response?.status === 'number') {
          status = axiosErr.response.status;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      return { data: null, error: message, status };
    }
  }

  public async post<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.post<T>(
        url,
        body,
        config
      );
      return { data: response.data, error: null, status: response.status };
    } catch (err: unknown) {
      let message = 'Erro desconhecido';
      let status = 500;

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<unknown> & {
          response?: { data?: unknown; statusText?: string; status?: number };
        };

        if (
          typeof axiosErr.response?.data === 'object' &&
          axiosErr.response.data !== null
        ) {
          const dataObj = axiosErr.response.data as ResponseWithMessage;
          if (typeof dataObj.message === 'string') {
            message = dataObj.message;
          } else if (axiosErr.response?.statusText) {
            message = axiosErr.response.statusText;
          } else if (axiosErr.message) {
            message = axiosErr.message;
          }
        } else if (axiosErr.response?.statusText) {
          message = axiosErr.response.statusText;
        } else if (axiosErr.message) {
          message = axiosErr.message;
        }

        if (typeof axiosErr.response?.status === 'number') {
          status = axiosErr.response.status;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      return { data: null, error: message, status };
    }
  }

  public async patch<T, U>(
    url: string,
    body: U,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.patch<T>(
        url,
        body,
        config
      );
      return { data: response.data, error: null, status: response.status };
    } catch (err: unknown) {
      let message = 'Erro desconhecido';
      let status = 500;

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<unknown> & {
          response?: { data?: unknown; statusText?: string; status?: number };
        };

        if (
          typeof axiosErr.response?.data === 'object' &&
          axiosErr.response.data !== null
        ) {
          const dataObj = axiosErr.response.data as ResponseWithMessage;
          if (typeof dataObj.message === 'string') {
            message = dataObj.message;
          } else if (axiosErr.response?.statusText) {
            message = axiosErr.response.statusText;
          } else if (axiosErr.message) {
            message = axiosErr.message;
          }
        } else if (axiosErr.response?.statusText) {
          message = axiosErr.response.statusText;
        } else if (axiosErr.message) {
          message = axiosErr.message;
        }

        if (typeof axiosErr.response?.status === 'number') {
          status = axiosErr.response.status;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      return { data: null, error: message, status };
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete<T>(
        url,
        config
      );
      return { data: response.data, error: null, status: response.status };
    } catch (err: unknown) {
      let message = 'Erro desconhecido';
      let status = 500;

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<unknown> & {
          response?: { data?: unknown; statusText?: string; status?: number };
        };

        if (
          typeof axiosErr.response?.data === 'object' &&
          axiosErr.response.data !== null
        ) {
          const dataObj = axiosErr.response.data as ResponseWithMessage;
          if (typeof dataObj.message === 'string') {
            message = dataObj.message;
          } else if (axiosErr.response?.statusText) {
            message = axiosErr.response.statusText;
          } else if (axiosErr.message) {
            message = axiosErr.message;
          }
        } else if (axiosErr.response?.statusText) {
          message = axiosErr.response.statusText;
        } else if (axiosErr.message) {
          message = axiosErr.message;
        }

        if (typeof axiosErr.response?.status === 'number') {
          status = axiosErr.response.status;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      return { data: null, error: message, status };
    }
  }
}

export const httpClient = new HttpClient('http://localhost:3000');
