import type {
    Method,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
  } from "axios";
  
  export type resultType = {
    accessToken?: string;
  };
  
  export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
  >;
  
  export interface YLHttpError extends AxiosError {
    isCancelRequest?: boolean;
  }
  
  export interface YLHttpResponse extends AxiosResponse {
    config: YLHttpRequestConfig;
  }
  
  export interface YLHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: YLHttpRequestConfig) => void;
    beforeResponseCallback?: (response: YLHttpResponse) => void;
  }
  
  export default class YLHttp {
    request<T>(
      method: RequestMethods,
      url: string,
      param?: AxiosRequestConfig,
      axiosConfig?: YLHttpRequestConfig
    ): Promise<T>;
    post<T, P>(url: string, params?: T, config?: YLHttpRequestConfig): Promise<P>;
    get<T, P>(url: string, params?: T, config?: YLHttpRequestConfig): Promise<P>;
  }
  