import { http } from "@/utils/http"



// 发送消息
export const sendMessage = (data: any) => {
    return http.request({
        "post",
        url: "/api/v1/msg",
        data
    })
}

// 获取历史消息
export const getHistoryMessage = (data: any) => {
    return http.request({
        "get",
        url: "",
        data
    })
}
