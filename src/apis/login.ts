import { http } from "@/utils/http";

export type LoginParams = {
  username: string;
  password: string;
};

export type Result = {
  code: number;
  msg: string;
  data: {
    token: string;
    expired: number;
    userInfo: {
      id: number;
      username: string;
      nickname: string;
      avatar: string;
    };
  };
};

export const login = (data: LoginParams) => {
  return http.request<Result>("post", "/api/v1/login", { data });
};

export type RegisterParams = {
  username: string;
  password: string;
};

