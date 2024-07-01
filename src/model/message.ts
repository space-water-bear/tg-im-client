import type UserInfo from "./UserInfo";

export default class Message {
    // 消息ID
    id: Nullable<number> = null;
    // 消息时间
    time: Nullable<number> = null;
    // 消息类型
    type: Nullable<string> = null;
    // 消息内容
    content: Nullable<string> = null;
    // 消息发送者
    user: Nullable<UserInfo> = null;
    // 消息发送者ID
    isMine: Nullable<boolean> = null;
    // 消息是否已读
    isRead: Nullable<boolean> = null;
    // 消息是否发送
    isSend: Nullable<boolean> = null;
    // 消息是否接收
    isReceive: Nullable<boolean> = null;
}