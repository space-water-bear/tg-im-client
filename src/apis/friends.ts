import { http } from "@/utils/http";

export type ResultList = {
  code: number;
  data: Data;
  msg: string;
  [property: string]: any;
};

export type Data = {
  rows: Row[];
  total: number;
  [property: string]: any;
};

export type Row = {
  avatar?: string;
  email?: string;
  friendId?: number;
  nickname?: string;
  username?: string;
  [property: string]: any;
};

export type Result = {
  code: number;
  data: any;
  msg: string;
  [property: string]: any;
};

export type AddRequest = {
  friendId: number;
  remark: string;
};

export type AgreeRequest = {
  friendId: number;
  status: number; // 1.同意，3.拒绝，4.黑名单
};

export const getList = () => {
  return http.request<ResultList>("get", "/api/v1/friend");
};

export const add = (data: AddRequest) => {
  return http.request<Result>("post", "/api/v1/friend", { data });
};

export const agree = (data: AgreeRequest) => {
  return http.request<Result>("put", `/api/v1/friend`, { data });
};
