export const SYSTEM_INFO = uni.getSystemInfoSync();

export const HOST = "http://localhost:10000/";

export const API_HOST = SYSTEM_INFO.uniPlatform === "web" ? "" : HOST;

export const API_PROXT = SYSTEM_INFO.uniPlatform === "web" ? "/api" : "";

export const packApiUrl = (url: string) => {
  // console.log("API_HOST", API_HOST);
  // console.log("API_PROXT", API_PROXT);
  // console.log("url ", url);
  // console.log(API_HOST + API_PROXT + url);
  if (url.slice(0, 4) === "http") return url;
  else return API_HOST + API_PROXT;
};
