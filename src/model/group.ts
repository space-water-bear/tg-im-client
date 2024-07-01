import type UserInfo from "./UserInfo";

export default class Group {
    // 群组id
    id: Nullable<number> = null;
    // 群组名称
    name: Nullable<string> = null;
    // 群组头像
    avatar: Nullable<string> = null;
    // 群组公告
    notice: Nullable<string> = null;
    // 群组描述
    description: Nullable<string> = null;
    // 群组类型
    type: Nullable<number> = null;
    //群组创建者
    creator: Nullable<number> = null;
    // 群组创建时间
    createTime: Nullable<string> = null;
    // 群组更新时间
    updateTime: Nullable<string> = null;
    // 群组成员
    members: Nullable<UserInfo[]> = null;
}