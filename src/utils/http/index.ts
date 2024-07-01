import Axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type CustomParamsSerializer,
  } from "axios";
  import type {
    YLHttpError,
    RequestMethods,
    YLHttpResponse,
    YLHttpRequestConfig,
  } from "./types";
  import { stringify } from "qs";
  import { packApiUrl } from "@/config";
  // import mpAdapter from "axios-miniprogram-adapter";
  // Axios.defaults.adapter = mpAdapter;
  import { uniAdapter } from "fant-axios-adapter";
  
  import { useAuthStore } from "@/store";
  
  const defaultConfig: AxiosRequestConfig = {
    baseURL: "/api",
    withCredentials: true,
    timeout: 10000,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    // 数组参数序列化
    paramsSerializer: {
      serialize: stringify as unknown as CustomParamsSerializer,
    },
    adapter: uniAdapter,
  };
  
  class YLHttp {
    constructor() {
      this.httpInterceptorsRequest();
      this.httpInterceptorsResponse();
    }
  
    /** token过期后，暂存待执行的请求 */
    private static requests = [];
  
    /** 防止重复刷新token */
    private static isRefreshing = false;
  
    /** 初始化配置对象 */
    private static initConfig: YLHttpRequestConfig = {};
  
    /** 保存当前Axios实例对象 */
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  
    /** 重连原始请求 */
    private static retryOriginalRequest(config: YLHttpRequestConfig) {
      return new Promise((resolve) => {
        YLHttp.requests.push((token: string) => {
          // console.log("push token", token);
          config.headers["Authorization"] = `Bearer ${token}`;
          resolve(config);
        });
      });
    }
  
    /** 拦截请求 */
    private httpInterceptorsRequest(): void {
      YLHttp.axiosInstance.interceptors.request.use(
        async (config: YLHttpRequestConfig): Promise<any> => {
          if (typeof config.beforeRequestCallback === "function") {
            config.beforeRequestCallback(config);
            return config;
          }
          if (YLHttp.initConfig.beforeRequestCallback) {
            YLHttp.initConfig.beforeRequestCallback(config);
            return config;
          }
          // 存储初始化
          const authState = useAuthStore();
  
          // 白名单
          const whiteList = [
            "/api/v1/login",
          ];
          return whiteList.find((url) => url === config.url)
            ? config
            : new Promise((resole) => {
                // console.log("拦截请求")
                const data = authState.token;
                // console.log("token", data);
                if (data) {
                  //如果有超时，就检查下
                  const now = new Date().getTime();
                  const expired = authState.expired * 1000 - now <= 0;
                  if (expired) {
                    // resole(YLHttp.retryOriginalRequest(config));
                    authState.logout();
                  } else {
                    config.headers["Authorization"] = `Bearer ${data}`;
                    resole(config);
                  }
                } else {
                  resole(config);
                }
              });
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  
    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
      const instance = YLHttp.axiosInstance;
      instance.interceptors.response.use(
        (response: YLHttpResponse) => {
          const $config = response.config;
          // console.log("响应拦截")
          if (typeof $config.beforeResponseCallback === "function") {
            $config.beforeResponseCallback(response);
            return response.data;
          }
  
          if (YLHttp.initConfig.beforeResponseCallback) {
            YLHttp.initConfig.beforeResponseCallback(response);
            return response.data;
          }
  
          return response.data;
        },
        (error: YLHttpError) => {
          // console.log(packApiUrl(import.meta.env.BASE_URL));
          console.log(error);
          const $error = error;
          $error.isCancelRequest = Axios.isCancel($error);
          return Promise.reject($error);
        }
      );
    }
  
    /**
     * request 请求方法
     */
    public request<T>(
      method: RequestMethods,
      url: string,
      param?: AxiosRequestConfig,
      axiosConfig?: YLHttpRequestConfig
    ): Promise<T> {
      const config = {
        method,
        url,
        ...param,
        ...axiosConfig,
      } as YLHttpRequestConfig;
  
      // 处理自定义请求/响应回调
      return new Promise((resolve, reject) => {
        YLHttp.axiosInstance
          .request(config)
          .then((response: undefined) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  
    /** 对Get请求的参数进行转换  */
    public urlParse<T>(data: object): string {
      
      let queryString = '';
      // if (typeof URLSearchParams !== undefined) {
      // 	const params = new URLSearchParams();
          
      // 	// 添加键值对
      // 	Object.entries(data).forEach(([key, value]) => {
      // 	  params.append(key, value);
      // 	});
      // 	queryString = params.toString();
      // }
      
      for (const key in data) {
          if (data.hasOwnProperty(key)) {
              if (queryString !== '') {
                  queryString += '&';
              }
              queryString += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
          }
      }
  
      return queryString;
    }
  
    /** 单独抽离的post工具函数 */
    public post<T, P>(
      url: string,
      params?: AxiosRequestConfig<T>,
      config?: YLHttpRequestConfig
    ): Promise<P> {
      return this.request<P>("post", url, params, config);
    }
  
    /** 单独抽离的get工具函数 */
    public get<T, P>(
      url: string,
      params?: AxiosRequestConfig<T>,
      config?: YLHttpRequestConfig
    ): Promise<P> {
      return this.request<P>("get", url, params, config);
    }
  }
  
  export const http = new YLHttp();
  